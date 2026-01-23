/**
 * API Route: Send Multi-Channel Communication
 * POST /api/counselor/communications/send - Send via Email/WhatsApp/SMS
 */

import { NextRequest, NextResponse } from 'next/server'
import { withCounselor } from '@/lib/auth/middleware'
import { notificationService } from '@/lib/notifications/notificationService'
import { z } from 'zod'
import { WebhookService } from '@/lib/webhooks/webhookService'

// Request schema
const sendMessageSchema = z.object({
  leadId: z.string(),
  studentName: z.string(),
  email: z.string().email().optional(),
  phone: z.string(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  channels: z.object({
    email: z.boolean(),
    whatsapp: z.boolean(),
    sms: z.boolean(),
  }),
  subject: z.string().optional(),
  message: z.string().min(1),
})

interface CounselorSession {
  userId: string
  role: string
}

async function handlePOST(req: NextRequest, session: CounselorSession) {
  try {
    const body = await req.json()
    const validatedData = sendMessageSchema.parse(body)

    // Validate: email channel requires email address and subject
    if (validatedData.channels.email) {
      if (!validatedData.email) {
        return NextResponse.json(
          {
            success: false,
            error: 'Email channel requires recipient email address',
          },
          { status: 400 }
        )
      }
      if (!validatedData.subject || !validatedData.subject.trim()) {
        return NextResponse.json(
          {
            success: false,
            error: 'Email channel requires subject line',
          },
          { status: 400 }
        )
      }
    }

    // Validate: at least one channel must be selected
    const hasChannel =
      validatedData.channels.email || validatedData.channels.whatsapp || validatedData.channels.sms
    if (!hasChannel) {
      return NextResponse.json(
        {
          success: false,
          error: 'At least one communication channel must be selected',
        },
        { status: 400 }
      )
    }

    // Prepare notification data
    const notificationData: Record<string, unknown> = {
      leadId: validatedData.leadId,
      studentName: validatedData.studentName,
      email: validatedData.email,
      phone: validatedData.phone,
      type: 'GENERAL',
      priority: validatedData.priority,
      customChannels: validatedData.channels,
    }

    // Add email data if email channel selected
    if (validatedData.channels.email && validatedData.email && validatedData.subject) {
      notificationData.emailData = {
        subject: validatedData.subject,
        html: convertMessageToHTML(validatedData.message),
      }
    }

    // Add WhatsApp data if WhatsApp channel selected
    if (validatedData.channels.whatsapp) {
      notificationData.whatsappData = {
        message: validatedData.message,
      }
    }

    // Add SMS data if SMS channel selected
    if (validatedData.channels.sms) {
      notificationData.smsData = {
        message: truncateForSMS(validatedData.message),
      }
    }

    // Send via unified notification service
    const result = await notificationService.send(notificationData)

    if (result.success) {
      // Dispatch webhook event for communication sent
      try {
        await WebhookService.onCommunicationSent(
          {
            id: validatedData.leadId,
            studentName: validatedData.studentName,
            email: validatedData.email,
            phone: validatedData.phone,
          },
          {
            type: 'MULTI_CHANNEL',
            channels: validatedData.channels,
            subject: validatedData.subject,
            messagePreview: validatedData.message.substring(0, 100),
            priority: validatedData.priority,
            sentBy: session.userId,
            sentAt: new Date().toISOString(),
            result: result.channels,
          }
        )
      } catch (webhookError) {
        console.error('Failed to dispatch communication.sent webhook:', webhookError)
      }

      return NextResponse.json({
        success: true,
        channels: result.channels,
        message: 'Message sent successfully',
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to send message',
          channels: result.channels,
        },
        { status: 500 }
      )
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    console.error('Error sending multi-channel message:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send message',
      },
      { status: 500 }
    )
  }
}

/**
 * Convert plain text message to HTML for email
 */
function convertMessageToHTML(message: string): string {
  const escapedMessage = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const paragraphs = escapedMessage.split('\n\n').map((para) => {
    const withLineBreaks = para.replace(/\n/g, '<br>')
    return `<p style="margin-bottom: 16px;">${withLineBreaks}</p>`
  })

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          p {
            margin-bottom: 16px;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 12px;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        ${paragraphs.join('')}
        <div class="footer">
          <p>
            <strong>Cerebrum Biology Academy</strong><br>
            Excellence in NEET Biology Coaching<br>
            📞 +91-88264-44334<br>
            🌐 cerebrumbiologyacademy.com
          </p>
        </div>
      </body>
    </html>
  `
}

/**
 * Truncate message for SMS (max 1600 characters)
 */
function truncateForSMS(message: string): string {
  const maxLength = 1600
  if (message.length <= maxLength) {
    return message
  }

  return message.substring(0, maxLength - 3) + '...'
}

export const POST = withCounselor(handlePOST)
