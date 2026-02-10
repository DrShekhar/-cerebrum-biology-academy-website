import { NextRequest } from 'next/server'
import { handleError, successResponse, ValidationError } from '@/lib/errors'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { emailService } from '@/lib/email/emailService'

// Validation schema for user feedback
const feedbackSchema = z.object({
  errorId: z.string().min(1, 'Error ID is required'),
  feedback: z.object({
    description: z.string().min(10, 'Description must be at least 10 characters'),
    email: z.string().email().optional(),
    reproductionSteps: z.string().optional(),
  }),
  timestamp: z.string().datetime(),
})

async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the feedback data
    const validatedData = feedbackSchema.parse(body)

    // Rate limiting per IP
    const ip =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    // Store the feedback
    await storeFeedback(validatedData, ip)

    // Send notification to team if email provided
    if (validatedData.feedback.email) {
      await notifyTeam(validatedData)
    }

    return successResponse(
      { received: true, errorId: validatedData.errorId },
      'Feedback received successfully'
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleError(
        new ValidationError('Invalid feedback format', error),
        '/api/errors/feedback'
      )
    }

    return handleError(error, '/api/errors/feedback')
  }
}

async function storeFeedback(feedback: z.infer<typeof feedbackSchema>, clientIP: string) {
  try {
    await prisma.error_feedback.create({
      data: {
        errorId: feedback.errorId,
        description: feedback.feedback.description,
        email: feedback.feedback.email,
        reproductionSteps: feedback.feedback.reproductionSteps,
        clientIP,
        createdAt: new Date(feedback.timestamp),
      },
    })

  } catch (error) {
    console.error('Failed to store feedback:', error)
    throw error
  }
}

async function notifyTeam(feedback: z.infer<typeof feedbackSchema>) {
  try {
    const devTeamEmail = process.env.DEV_TEAM_EMAIL || 'support@cerebrumbiologyacademy.com'

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error Feedback Received</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">🐛 User Error Feedback Received</h1>
  </div>

  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #dc2626;">
      <h3 style="margin-top: 0; color: #dc2626;">Error Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 40%;">Error ID:</td>
          <td style="padding: 8px 0; font-family: monospace;">${feedback.errorId}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Timestamp:</td>
          <td style="padding: 8px 0;">${new Date(feedback.timestamp).toLocaleString('en-US', {
            dateStyle: 'full',
            timeStyle: 'long',
          })}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">User Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${feedback.feedback.email}">${feedback.feedback.email}</a></td>
        </tr>
      </table>
    </div>

    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h3 style="margin-top: 0; color: #dc2626;">User Description</h3>
      <p style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 14px;">${feedback.feedback.description}</p>
    </div>

    ${
      feedback.feedback.reproductionSteps
        ? `
    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h3 style="margin-top: 0; color: #dc2626;">Reproduction Steps</h3>
      <p style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 14px;">${feedback.feedback.reproductionSteps}</p>
    </div>
    `
        : ''
    }

    <div style="background: #fef2f2; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <h3 style="margin-top: 0; color: #dc2626;">Action Required</h3>
      <p>Please investigate this error and respond to the user at <a href="mailto:${feedback.feedback.email}">${feedback.feedback.email}</a> with updates on the resolution.</p>
    </div>

    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
      <p style="font-size: 14px; color: #666;">This is an automated notification from the error tracking system.</p>
    </div>
  </div>
</body>
</html>
`

    const textContent = `Error Feedback Received

Error ID: ${feedback.errorId}
Timestamp: ${new Date(feedback.timestamp).toLocaleString()}
User Email: ${feedback.feedback.email}

User Description:
${feedback.feedback.description}

${feedback.feedback.reproductionSteps ? `Reproduction Steps:\n${feedback.feedback.reproductionSteps}\n\n` : ''}
Action Required: Please investigate this error and respond to the user at ${feedback.feedback.email}.
`

    const emailResult = await emailService.send({
      to: devTeamEmail,
      subject: `User Error Feedback: ${feedback.errorId}`,
      html: htmlContent,
      text: textContent,
      replyTo: feedback.feedback.email,
    })

    if (emailResult.success) {
    } else {
      console.error('Failed to send team notification email:', emailResult.error)
    }
  } catch (error) {
    console.error('Failed to notify team:', error)
    // Don't throw here as feedback storage succeeded
  }
}

export { POST }
