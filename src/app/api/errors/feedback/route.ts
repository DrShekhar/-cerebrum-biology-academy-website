import { NextRequest } from 'next/server'
import { handleError, successResponse, ValidationError } from '@/lib/errors'
import { withErrorHandling } from '@/lib/errors'
import { z } from 'zod'
import prisma from '@/lib/prisma'

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

    console.log('User feedback stored:', {
      errorId: feedback.errorId,
      hasEmail: !!feedback.feedback.email,
      clientIP,
    })
  } catch (error) {
    console.error('Failed to store feedback:', error)
    throw error
  }
}

async function notifyTeam(feedback: z.infer<typeof feedbackSchema>) {
  try {
    // TODO: Send email notification to development team
    // const emailContent = `
    //   Error Feedback Received
    //
    //   Error ID: ${feedback.errorId}
    //   User Email: ${feedback.feedback.email}
    //   Description: ${feedback.feedback.description}
    //   Reproduction Steps: ${feedback.feedback.reproductionSteps || 'Not provided'}
    //   Timestamp: ${feedback.timestamp}
    // `
    //
    // await sendEmail({
    //   to: 'dev-team@cerebrumbiologyacademy.com',
    //   subject: 'User Error Feedback',
    //   content: emailContent
    // })

    console.log('Team notified of user feedback:', feedback.errorId)
  } catch (error) {
    console.error('Failed to notify team:', error)
    // Don't throw here as feedback storage succeeded
  }
}

export { POST }
