import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { WhatsAppBusinessService } from '@/lib/integrations/whatsappBusinessService'

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
    const enrollment = await prisma.enrollments.findUnique({
      where: { id: validatedData.enrollmentId },
      include: {
        users: true,
        courses: true,
      },
    })

    if (!enrollment) {
      return NextResponse.json({ success: false, error: 'Enrollment not found' }, { status: 404 })
    }

    // Check if user has a phone number
    if (!enrollment.users.phone) {
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

Dear ${enrollment.users.name},

Congratulations! Your enrollment in *${enrollment.courses.name}* has been confirmed.

📚 Course Details:
- Course: ${enrollment.courses.name}
- Enrollment ID: ${enrollment.id}
- Status: Active

🔗 Access Your Course:
${baseUrl}/student/courses/${enrollment.courseId}

📧 Login Credentials:
Email: ${enrollment.users.email}
(Password has been sent to your email)

📞 Need Help?
Contact our support team at +91-88264-44334

Happy Learning! 🚀

- Cerebrum Biology Academy Team`
        break

      case 'payment_confirmation':
        message = `✅ Payment Received

Dear ${enrollment.users.name},

Your payment for *${enrollment.courses.name}* has been successfully received.

💰 Payment Details:
- Amount: ₹${(enrollment.paidAmount / 100).toLocaleString('en-IN')}
- Order ID: ${validatedData.orderId}
- Status: Completed

📧 A payment receipt has been sent to your email.

Thank you for choosing Cerebrum Biology Academy!`
        break

      case 'course_access':
        message = `🔓 Course Access Granted

Dear ${enrollment.users.name},

You now have full access to *${enrollment.courses.name}*.

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

    // Integrate with WhatsApp Business API using WhatsAppBusinessService
    const whatsappPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID
    const whatsappToken = process.env.WHATSAPP_ACCESS_TOKEN

    if (!whatsappPhoneId || !whatsappToken) {
      // Log notification but don't fail if WhatsApp is not configured

      // Create communication log
      await prisma.communication_logs.create({
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

    // Send WhatsApp message via WhatsApp Business API
    try {
      const whatsappResponse = await WhatsAppBusinessService.sendTextMessage(
        enrollment.users.phone,
        message
      )

      // Create communication log
      await prisma.communication_logs.create({
        data: {
          userId: enrollment.userId,
          type: 'ENROLLMENT_CONFIRMATION',
          channel: 'WHATSAPP',
          content: message,
          status: 'SENT',
          sentAt: new Date(),
          whatsappMessageId: whatsappResponse.messages?.[0]?.id,
        },
      })


      return NextResponse.json({
        success: true,
        message: 'WhatsApp notification sent successfully',
        messageId: whatsappResponse.messages?.[0]?.id,
      })
    } catch (apiError) {
      console.error('WhatsApp API error:', apiError)

      // Create failed communication log
      await prisma.communication_logs.create({
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
          details: error.issues,
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
