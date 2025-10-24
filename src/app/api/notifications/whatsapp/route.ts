import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

// Validation schema
const whatsappNotificationSchema = z.object({
  orderId: z.string().optional(),
  enrollmentId: z.string(),
  userId: z.string(),
  courseId: z.string().optional(),
  type: z.enum(['enrollment_confirmation', 'payment_confirmation', 'course_access', 'custom']),
  customMessage: z.string().optional(),
})

type WhatsAppNotificationRequest = z.infer<typeof whatsappNotificationSchema>

export async function POST(request: NextRequest) {
  try {
    const body: WhatsAppNotificationRequest = await request.json()

    // Validate input
    const validatedData = whatsappNotificationSchema.parse(body)

    // Get user and enrollment details
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: validatedData.enrollmentId },
      include: {
        user: true,
        course: true,
      },
    })

    if (!enrollment) {
      return NextResponse.json({ success: false, error: 'Enrollment not found' }, { status: 404 })
    }

    // Check if user has a phone number
    if (!enrollment.user.phone) {
      console.log('User has no phone number, skipping WhatsApp notification')
      return NextResponse.json({
        success: false,
        error: 'User has no phone number',
        skipped: true,
      })
    }

    // Generate message based on type
    let message = ''
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cerebrumbiologyacademy.com'

    switch (validatedData.type) {
      case 'enrollment_confirmation':
        message = `🎉 Welcome to Cerebrum Biology Academy!

Dear ${enrollment.user.name},

Congratulations! Your enrollment in *${enrollment.course.name}* has been confirmed.

📚 Course Details:
- Course: ${enrollment.course.name}
- Enrollment ID: ${enrollment.id}
- Status: Active

🔗 Access Your Course:
${baseUrl}/student/courses/${enrollment.courseId}

📧 Login Credentials:
Email: ${enrollment.user.email}
(Password has been sent to your email)

📞 Need Help?
Contact our support team at +91-XXXXXXXXXX

Happy Learning! 🚀

- Cerebrum Biology Academy Team`
        break

      case 'payment_confirmation':
        message = `✅ Payment Received

Dear ${enrollment.user.name},

Your payment for *${enrollment.course.name}* has been successfully received.

💰 Payment Details:
- Amount: ₹${(enrollment.paidAmount / 100).toLocaleString('en-IN')}
- Order ID: ${validatedData.orderId}
- Status: Completed

📧 A payment receipt has been sent to your email.

Thank you for choosing Cerebrum Biology Academy!`
        break

      case 'course_access':
        message = `🔓 Course Access Granted

Dear ${enrollment.user.name},

You now have full access to *${enrollment.course.name}*.

🎯 Get Started:
${baseUrl}/student/courses/${enrollment.courseId}

Happy Learning! 📚`
        break

      case 'custom':
        message = validatedData.customMessage || 'Custom notification'
        break

      default:
        message = 'Notification from Cerebrum Biology Academy'
    }

    // TODO: Integrate with WhatsApp Business API
    // Options: Twilio, WhatsApp Cloud API, or third-party service

    const whatsappApiKey = process.env.WHATSAPP_API_KEY
    const whatsappApiUrl = process.env.WHATSAPP_API_URL

    if (!whatsappApiKey || !whatsappApiUrl) {
      // Log notification but don't fail if WhatsApp is not configured
      console.log('WhatsApp API not configured, logging notification:')
      console.log({
        to: enrollment.user.phone,
        message,
        type: validatedData.type,
      })

      // Create communication log
      await prisma.communicationLog.create({
        data: {
          userId: enrollment.userId,
          type: 'ENROLLMENT_CONFIRMATION',
          channel: 'WHATSAPP',
          content: message,
          status: 'SENT',
          sentAt: new Date(),
        },
      })

      return NextResponse.json({
        success: true,
        message: 'WhatsApp notification logged (API not configured)',
        logged: true,
      })
    }

    // Send WhatsApp message via configured API
    try {
      const whatsappResponse = await fetch(whatsappApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${whatsappApiKey}`,
        },
        body: JSON.stringify({
          to: enrollment.user.phone,
          message,
          // Additional fields based on your WhatsApp API provider
        }),
      })

      if (!whatsappResponse.ok) {
        throw new Error('WhatsApp API request failed')
      }

      const whatsappData = await whatsappResponse.json()

      // Create communication log
      await prisma.communicationLog.create({
        data: {
          userId: enrollment.userId,
          type: 'ENROLLMENT_CONFIRMATION',
          channel: 'WHATSAPP',
          content: message,
          status: 'SENT',
          sentAt: new Date(),
          whatsappMessageId: whatsappData.messageId || whatsappData.id,
        },
      })

      console.log('WhatsApp notification sent successfully:', {
        to: enrollment.user.phone,
        messageId: whatsappData.messageId || whatsappData.id,
      })

      return NextResponse.json({
        success: true,
        message: 'WhatsApp notification sent successfully',
        messageId: whatsappData.messageId || whatsappData.id,
      })
    } catch (apiError) {
      console.error('WhatsApp API error:', apiError)

      // Create failed communication log
      await prisma.communicationLog.create({
        data: {
          userId: enrollment.userId,
          type: 'ENROLLMENT_CONFIRMATION',
          channel: 'WHATSAPP',
          content: message,
          status: 'FAILED',
          sentAt: new Date(),
        },
      })

      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send WhatsApp notification',
          details: apiError instanceof Error ? apiError.message : 'Unknown error',
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('WhatsApp notification error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send notification',
      },
      { status: 500 }
    )
  }
}
