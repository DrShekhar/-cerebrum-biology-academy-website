import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { emailService } from '@/lib/email/emailService'

// Validation schema
const emailNotificationSchema = z.object({
  orderId: z.string().optional(),
  enrollmentId: z.string(),
  userId: z.string(),
  courseId: z.string().optional(),
  type: z.enum(['enrollment_confirmation', 'payment_confirmation', 'login_credentials', 'custom']),
  customSubject: z.string().optional(),
  customMessage: z.string().optional(),
})

type EmailNotificationRequest = z.infer<typeof emailNotificationSchema>

export async function POST(request: NextRequest) {
  try {
    const body: EmailNotificationRequest = await request.json()

    // Validate input
    const validatedData = emailNotificationSchema.parse(body)

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

    // Get payment details if orderId provided
    let payment = null
    if (validatedData.orderId) {
      payment = await prisma.payments.findFirst({
        where: { razorpayOrderId: validatedData.orderId },
      })
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cerebrumbiologyacademy.com'

    // Generate email content based on type
    let subject = ''
    let htmlContent = ''
    let textContent = ''

    switch (validatedData.type) {
      case 'enrollment_confirmation':
        subject = `Welcome to ${enrollment.course.name} - Cerebrum Biology Academy`
        htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Cerebrum Biology Academy</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #16a34a 0%, #059669 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 28px;">🎉 Welcome to Cerebrum Biology Academy!</h1>
  </div>

  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px;">Dear <strong>${enrollment.user.name}</strong>,</p>

    <p style="font-size: 16px;">Congratulations! Your enrollment in <strong>${enrollment.course.name}</strong> has been confirmed.</p>

    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
      <h3 style="margin-top: 0; color: #16a34a;">📚 Course Details</h3>
      <ul style="list-style: none; padding: 0;">
        <li>✓ Course: ${enrollment.course.name}</li>
        <li>✓ Enrollment ID: ${enrollment.id}</li>
        <li>✓ Status: <span style="color: #16a34a; font-weight: bold;">Active</span></li>
        <li>✓ Duration: ${enrollment.course.duration} months</li>
      </ul>
    </div>

    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #16a34a;">🔐 Login Credentials</h3>
      <p><strong>Email:</strong> ${enrollment.user.email}</p>
      <p><strong>Password:</strong> Check your email for your temporary password (or reset if needed)</p>
      <p style="margin-top: 15px;">
        <a href="${baseUrl}/login" style="display: inline-block; background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Login to Your Account</a>
      </p>
    </div>

    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #16a34a;">🚀 Get Started</h3>
      <p>Access your course materials, video lectures, and study resources:</p>
      <p style="margin-top: 15px;">
        <a href="${baseUrl}/student/courses/${enrollment.courseId}" style="display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Access Your Course →</a>
      </p>
    </div>

    <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #0369a1;">📞 Need Help?</h3>
      <p>Our support team is here to help you:</p>
      <ul>
        <li>📧 Email: <a href="mailto:support@cerebrumbiologyacademy.com">support@cerebrumbiologyacademy.com</a></li>
        <li>💬 WhatsApp: <a href="https://wa.me/918826444334">+91-8826444334</a></li>
        <li>⏰ Support Hours: Mon-Sat, 9 AM - 8 PM IST</li>
      </ul>
    </div>

    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
      <p style="font-size: 14px; color: #666;">Happy Learning! 📚</p>
      <p style="font-size: 14px; color: #666;"><strong>- Cerebrum Biology Academy Team</strong></p>
    </div>
  </div>

  <div style="text-align: center; margin-top: 20px; padding: 20px; font-size: 12px; color: #999;">
    <p>© ${new Date().getFullYear()} Cerebrum Biology Academy. All rights reserved.</p>
    <p>This email was sent to ${enrollment.user.email} regarding your enrollment.</p>
  </div>
</body>
</html>
`
        textContent = `Welcome to Cerebrum Biology Academy!

Dear ${enrollment.user.name},

Congratulations! Your enrollment in ${enrollment.course.name} has been confirmed.

Course Details:
- Course: ${enrollment.course.name}
- Enrollment ID: ${enrollment.id}
- Status: Active
- Duration: ${enrollment.course.duration} months

Login Credentials:
Email: ${enrollment.user.email}
(Check your email for your temporary password)

Access Your Course:
${baseUrl}/student/courses/${enrollment.courseId}

Need Help?
Email: support@cerebrumbiologyacademy.com
WhatsApp: +91-8826444334
Support Hours: Mon-Sat, 9 AM - 8 PM IST

Happy Learning!
- Cerebrum Biology Academy Team
`
        break

      case 'payment_confirmation':
        subject = 'Payment Receipt - Cerebrum Biology Academy'
        const amountPaid = payment ? payment.amount / 100 : 0
        htmlContent = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #16a34a;">✅ Payment Received</h2>
  <p>Dear ${enrollment.user.name},</p>
  <p>Your payment for <strong>${enrollment.course.name}</strong> has been successfully received.</p>

  <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3>💰 Payment Details</h3>
    <ul>
      <li>Amount Paid: ₹${amountPaid.toLocaleString('en-IN')}</li>
      <li>Order ID: ${validatedData.orderId}</li>
      <li>Payment Date: ${new Date().toLocaleDateString('en-IN')}</li>
      <li>Status: <span style="color: #16a34a; font-weight: bold;">Completed</span></li>
    </ul>
  </div>

  <p>A detailed receipt has been generated and is available in your account dashboard.</p>
  <p>Thank you for choosing Cerebrum Biology Academy!</p>
</body>
</html>
`
        textContent = `Payment Received

Dear ${enrollment.user.name},

Your payment for ${enrollment.course.name} has been successfully received.

Payment Details:
- Amount Paid: ₹${amountPaid.toLocaleString('en-IN')}
- Order ID: ${validatedData.orderId}
- Payment Date: ${new Date().toLocaleDateString('en-IN')}
- Status: Completed

Thank you for choosing Cerebrum Biology Academy!
`
        break

      case 'custom':
        subject = validatedData.customSubject || 'Notification from Cerebrum Biology Academy'
        htmlContent = validatedData.customMessage || 'Custom notification'
        textContent = validatedData.customMessage || 'Custom notification'
        break

      default:
        subject = 'Notification from Cerebrum Biology Academy'
        htmlContent = '<p>You have a new notification from Cerebrum Biology Academy.</p>'
        textContent = 'You have a new notification from Cerebrum Biology Academy.'
    }

    // Send email via EmailService (with SendGrid primary and Resend fallback)
    try {
      const emailResult = await emailService.send({
        to: enrollment.user.email,
        subject,
        html: htmlContent,
        text: textContent,
      })

      if (!emailResult.success) {
        // Create failed communication log
        await prisma.communicationLog.create({
          data: {
            userId: enrollment.userId,
            type: 'ENROLLMENT_CONFIRMATION',
            channel: 'EMAIL',
            subject,
            content: textContent,
            status: 'FAILED',
            sentAt: new Date(),
          },
        })

        return NextResponse.json(
          {
            success: false,
            error: 'Failed to send email notification',
            details: emailResult.error,
          },
          { status: 500 }
        )
      }

      // Create communication log
      await prisma.communicationLog.create({
        data: {
          userId: enrollment.userId,
          type: 'ENROLLMENT_CONFIRMATION',
          channel: 'EMAIL',
          subject,
          content: textContent,
          status: 'SENT',
          sentAt: new Date(),
          emailMessageId: emailResult.messageId,
        },
      })

      console.log('Email notification sent successfully:', {
        to: enrollment.user.email,
        subject,
        messageId: emailResult.messageId,
        provider: emailResult.provider,
      })

      return NextResponse.json({
        success: true,
        message: 'Email notification sent successfully',
        messageId: emailResult.messageId,
        provider: emailResult.provider,
      })
    } catch (apiError) {
      console.error('Email service error:', apiError)

      // Create failed communication log
      await prisma.communicationLog.create({
        data: {
          userId: enrollment.userId,
          type: 'ENROLLMENT_CONFIRMATION',
          channel: 'EMAIL',
          subject,
          content: textContent,
          status: 'FAILED',
          sentAt: new Date(),
        },
      })

      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send email notification',
          details: apiError instanceof Error ? apiError.message : 'Unknown error',
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Email notification error:', error)

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
