/**
 * Interakt WhatsApp Webhook Handler
 * Handles incoming messages and status updates from Interakt
 *
 * Webhook URL: https://cerebrumbiologyacademy.com/api/whatsapp/interakt-webhook
 * Configure this URL in Interakt Dashboard > Settings > Webhooks
 */

import { NextRequest, NextResponse } from 'next/server'
import { parseWebhookPayload, sendWhatsAppMessage, trackUser, trackEvent } from '@/lib/interakt'
import { logger } from '@/lib/utils/logger'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

const INTERAKT_WEBHOOK_SECRET = process.env.INTERAKT_WEBHOOK_SECRET

/**
 * Verify Interakt webhook signature
 * Interakt uses HMAC-SHA256 signature verification
 */
function verifyWebhookSignature(payload: string, signature: string | null): boolean {
  if (!INTERAKT_WEBHOOK_SECRET) {
    // In development or if secret not configured, log warning but allow
    logger.warn('INTERAKT_WEBHOOK_SECRET not configured - skipping signature verification', {
      service: 'interakt-webhook',
    })
    return true
  }

  if (!signature) {
    logger.warn('No signature provided in webhook request', { service: 'interakt-webhook' })
    return false
  }

  try {
    // Interakt typically sends signature in format: sha256=<signature>
    const expectedSignature = signature.startsWith('sha256=') ? signature.slice(7) : signature

    const computedSignature = crypto
      .createHmac('sha256', INTERAKT_WEBHOOK_SECRET)
      .update(payload, 'utf8')
      .digest('hex')

    // Use timing-safe comparison to prevent timing attacks
    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(computedSignature, 'hex')
    )

    if (!isValid) {
      logger.warn('Webhook signature verification failed', {
        service: 'interakt-webhook',
        receivedSignature: expectedSignature.substring(0, 10) + '...',
      })
    }

    return isValid
  } catch (error) {
    logger.error('Error verifying webhook signature', {
      service: 'interakt-webhook',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    return false
  }
}

interface InteraktWebhookPayload {
  type: string
  data?: {
    customer?: {
      phone_number: string
      country_code: string
      id: string
      traits?: Record<string, any>
    }
    message?: {
      id: string
      type: string
      text?: string
      timestamp: number
      media?: {
        type: string
        url: string
        caption?: string
      }
    }
    buttonReply?: {
      id: string
      text: string
    }
    status?: string
    messageId?: string
  }
  timestamp?: string
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      status: 'ok',
      service: 'Interakt WhatsApp Webhook',
      message: 'Webhook endpoint is active. Use POST for webhook events.',
    },
    { status: 200 }
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()

    // Verify webhook signature for security
    const signature =
      request.headers.get('x-interakt-signature') ||
      request.headers.get('x-hub-signature-256') ||
      request.headers.get('x-signature')

    if (!verifyWebhookSignature(body, signature)) {
      logger.warn('Webhook signature verification failed - rejecting request', {
        service: 'interakt-webhook',
        hasSignature: !!signature,
      })
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    let payload: InteraktWebhookPayload

    try {
      payload = JSON.parse(body)
    } catch {
      logger.warn('Invalid JSON in Interakt webhook', { service: 'interakt-webhook' })
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    logger.info('Interakt webhook received', {
      service: 'interakt-webhook',
      type: payload.type,
      timestamp: payload.timestamp,
      signatureVerified: true,
    })

    const parsedEvent = parseWebhookPayload(payload)

    if (!parsedEvent) {
      logger.warn('Unknown Interakt webhook event type', {
        service: 'interakt-webhook',
        type: payload.type,
      })
      return NextResponse.json({ status: 'acknowledged', processed: false }, { status: 200 })
    }

    switch (parsedEvent.type) {
      case 'message':
        await handleIncomingMessage(parsedEvent.data, payload)
        break

      case 'status':
        await handleStatusUpdate(parsedEvent.data)
        break

      case 'button_reply':
        await handleButtonReply(parsedEvent.data, payload)
        break

      default:
        logger.info('Unhandled Interakt event type', {
          service: 'interakt-webhook',
          type: parsedEvent.type,
        })
    }

    return NextResponse.json({ status: 'success', processed: true }, { status: 200 })
  } catch (error) {
    logger.error('Interakt webhook error', {
      service: 'interakt-webhook',
      error: error instanceof Error ? error.message : 'Unknown error',
    })

    return NextResponse.json(
      { status: 'error', message: 'Internal processing error' },
      { status: 200 }
    )
  }
}

async function handleIncomingMessage(data: any, originalPayload: InteraktWebhookPayload) {
  const phone = data.from || originalPayload.data?.customer?.phone_number
  const messageText = data.text || originalPayload.data?.message?.text
  const messageType = data.messageType || originalPayload.data?.message?.type || 'text'

  if (!phone) {
    logger.warn('No phone number in incoming message', { service: 'interakt-webhook' })
    return
  }

  logger.info('Processing incoming WhatsApp message', {
    service: 'interakt-webhook',
    from: phone,
    type: messageType,
    preview: messageText?.substring(0, 50),
  })

  await trackEvent({
    phone,
    eventName: 'message_received',
    eventData: {
      type: messageType,
      timestamp: new Date().toISOString(),
    },
  })

  if (messageType === 'text' && messageText) {
    await processTextMessage(phone, messageText, originalPayload)
  } else if (messageType === 'image' || messageType === 'document') {
    await handleMediaMessage(phone, messageType, originalPayload)
  }
}

async function processTextMessage(
  phone: string,
  text: string,
  originalPayload: InteraktWebhookPayload
) {
  const lowerText = text.toLowerCase().trim()

  if (lowerText === 'demo' || lowerText.includes('book demo') || lowerText.includes('free class')) {
    await handleDemoRequest(phone, originalPayload)
    return
  }

  if (lowerText === 'courses' || lowerText === 'programs' || lowerText.includes('what courses')) {
    await handleCoursesRequest(phone)
    return
  }

  if (
    lowerText === 'fees' ||
    lowerText === 'price' ||
    lowerText.includes('how much') ||
    lowerText.includes('pricing')
  ) {
    await handleFeesRequest(phone)
    return
  }

  if (lowerText === 'help' || lowerText.includes('talk to') || lowerText.includes('counselor')) {
    await handleHelpRequest(phone, originalPayload)
    return
  }

  if (lowerText === 'hi' || lowerText === 'hello' || lowerText === 'hey') {
    await handleGreeting(phone, originalPayload)
    return
  }

  await handleGeneralInquiry(phone, text, originalPayload)
}

async function handleGreeting(phone: string, originalPayload: InteraktWebhookPayload) {
  const customerName =
    originalPayload.data?.customer?.traits?.name ||
    originalPayload.data?.customer?.traits?.firstName ||
    'there'

  await sendWhatsAppMessage({
    phone,
    templateName: 'welcome_message',
    templateParams: {
      '1': customerName,
    },
  })

  await trackUser({
    phone,
    traits: {
      lastContact: new Date().toISOString(),
      source: 'whatsapp_greeting',
    },
  })
}

async function handleDemoRequest(phone: string, originalPayload: InteraktWebhookPayload) {
  const customerName = originalPayload.data?.customer?.traits?.name || 'Student'

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dateStr = tomorrow.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  await sendWhatsAppMessage({
    phone,
    message: `Great choice, ${customerName}! 🎉

We'd love to schedule a FREE demo class for you!

📅 Next available: ${dateStr}
⏰ Time slots: 10 AM, 2 PM, 5 PM, 7 PM

Please reply with your preferred time, or our counselor will call you shortly to schedule.

Meanwhile, you can also book online: https://cerebrumbiologyacademy.com/book-demo`,
  })

  await trackEvent({
    phone,
    eventName: 'demo_requested',
    eventData: {
      source: 'whatsapp',
      timestamp: new Date().toISOString(),
    },
  })

  try {
    // Try to track in demo_bookings table
    const existingBooking = await prisma.demo_bookings.findFirst({
      where: { phone },
      orderBy: { createdAt: 'desc' },
    })

    if (!existingBooking) {
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
      const dateStr = tomorrow.toISOString().split('T')[0]

      await prisma.demo_bookings.create({
        data: {
          id: `demo_wa_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          studentName: customerName,
          phone,
          preferredDate: dateStr,
          preferredTime: '10:00 AM',
          source: 'WHATSAPP',
          status: 'PENDING',
          message: 'Demo requested via WhatsApp auto-response',
          updatedAt: new Date(),
        },
      })
    }
  } catch (error) {
    logger.warn('Could not create demo booking in database', {
      service: 'interakt-webhook',
      phone,
      error: error instanceof Error ? error.message : 'Unknown',
    })
  }
}

async function handleCoursesRequest(phone: string) {
  await sendWhatsAppMessage({
    phone,
    templateName: 'course_information',
    templateParams: {},
  })

  await trackEvent({
    phone,
    eventName: 'courses_inquiry',
    eventData: {
      source: 'whatsapp',
      timestamp: new Date().toISOString(),
    },
  })
}

async function handleFeesRequest(phone: string) {
  await sendWhatsAppMessage({
    phone,
    message: `💰 *Cerebrum Biology Academy Fee Structure*

*1. Pinnacle Batch (Class 12/Dropper)*
   Starting from ₹42,000
   - Complete NEET Biology
   - 200+ hours live classes
   - Personal mentor

*2. Foundation Batch (Class 11)*
   Starting from ₹35,000
   - Strong concept building
   - Weekly tests

*3. Crash Course (3 months)*
   ₹15,000
   - Intensive revision
   - Mock tests

💳 EMI options available!
🎁 Early bird discounts up to 20%

Reply DEMO to book a free class, or call us at +91-88264-44334`,
  })

  await trackEvent({
    phone,
    eventName: 'fees_inquiry',
    eventData: {
      source: 'whatsapp',
      timestamp: new Date().toISOString(),
    },
  })
}

async function handleHelpRequest(phone: string, originalPayload: InteraktWebhookPayload) {
  await sendWhatsAppMessage({
    phone,
    message: `🙋 *Need Help?*

Our counselor will call you within 5 minutes!

Or you can reach us at:
📞 +91-88264-44334
📧 support@cerebrumbiologyacademy.com

⏰ Available: Mon-Sat, 9 AM - 8 PM

What would you like help with?
1. Course selection
2. Fee payment
3. Technical support
4. Schedule queries

Reply with the number or describe your query!`,
  })

  const counselorPhone = process.env.COUNSELOR_WHATSAPP_NUMBER || '+918826444334'

  try {
    await sendWhatsAppMessage({
      phone: counselorPhone,
      message: `🔔 *New Help Request*

Student Phone: ${phone}
Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Please follow up within 5 minutes!`,
    })
  } catch {
    logger.warn('Could not notify counselor', { service: 'interakt-webhook' })
  }
}

async function handleGeneralInquiry(
  phone: string,
  text: string,
  originalPayload: InteraktWebhookPayload
) {
  const isBiologyQuestion =
    /\b(cell|DNA|gene|biology|NEET|photosynthesis|enzyme|protein|chromosome|mitosis|meiosis)\b/i.test(
      text
    )

  if (isBiologyQuestion) {
    await sendWhatsAppMessage({
      phone,
      message: `📚 Great question about biology!

For detailed explanations and personalized doubt-solving, join our courses where you'll get:
✅ Expert faculty from AIIMS/JIPMER
✅ 24/7 doubt support
✅ Video explanations

Reply DEMO to experience a free class, or visit our AI Biology Tutor: https://cerebrumbiologyacademy.com/ai-tutor`,
    })
  } else {
    await sendWhatsAppMessage({
      phone,
      message: `Thanks for your message! 😊

Here's what I can help you with:
• Reply *DEMO* - Book a free class
• Reply *COURSES* - View our programs
• Reply *FEES* - Check pricing
• Reply *HELP* - Talk to our team

Or simply type your biology question and our AI tutor will assist you!`,
    })
  }

  await trackEvent({
    phone,
    eventName: 'general_inquiry',
    eventData: {
      message_preview: text.substring(0, 100),
      is_biology_question: isBiologyQuestion,
      timestamp: new Date().toISOString(),
    },
  })
}

async function handleMediaMessage(
  phone: string,
  mediaType: string,
  originalPayload: InteraktWebhookPayload
) {
  await sendWhatsAppMessage({
    phone,
    message:
      mediaType === 'image'
        ? `📸 Thanks for sharing the image!

If this is a biology diagram or question paper, our expert faculty can help explain it in detail.

For now, please describe what you'd like to know about this image, or reply DEMO to book a free class!`
        : `📄 Thanks for sharing the document!

Our team will review it and get back to you shortly.

Meanwhile, reply:
• DEMO - Book a free class
• HELP - Talk to counselor`,
  })

  await trackEvent({
    phone,
    eventName: 'media_received',
    eventData: {
      type: mediaType,
      timestamp: new Date().toISOString(),
    },
  })
}

async function handleButtonReply(data: any, originalPayload: InteraktWebhookPayload) {
  const phone = data.from || originalPayload.data?.customer?.phone_number
  const buttonId = data.buttonId
  const buttonText = data.buttonText

  if (!phone) {
    logger.warn('No phone in button reply', { service: 'interakt-webhook' })
    return
  }

  logger.info('Processing button reply', {
    service: 'interakt-webhook',
    phone,
    buttonId,
    buttonText,
  })

  switch (buttonText?.toUpperCase() || buttonId) {
    case 'DEMO':
      await handleDemoRequest(phone, originalPayload)
      break
    case 'COURSES':
      await handleCoursesRequest(phone)
      break
    case 'FEES':
      await handleFeesRequest(phone)
      break
    default:
      await handleGeneralInquiry(phone, buttonText || '', originalPayload)
  }

  await trackEvent({
    phone,
    eventName: 'button_clicked',
    eventData: {
      buttonId,
      buttonText,
      timestamp: new Date().toISOString(),
    },
  })
}

async function handleStatusUpdate(data: any) {
  const { messageId, status, timestamp } = data

  logger.info('Message status update', {
    service: 'interakt-webhook',
    messageId,
    status,
    timestamp,
  })

  // Status updates are logged but not stored in DB for now
  // Future: Add WhatsAppMessageLog table to track message delivery status
}
