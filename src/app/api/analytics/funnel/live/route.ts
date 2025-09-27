import { NextRequest } from 'next/server'
import { COURSE_SELECTION_FUNNEL } from '../../../../../lib/analytics/conversionFunnelAnalysis'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return new Response('User ID is required', { status: 400 })
  }

  // Create Server-Sent Events stream
  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection confirmation
      const encoder = new TextEncoder()
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            type: 'connected',
            userId,
            timestamp: Date.now(),
          })}\n\n`
        )
      )

      // Set up real-time monitoring
      // In a production environment, you would:
      // 1. Subscribe to real-time events from your database or message queue
      // 2. Listen for funnel events for this specific user
      // 3. Send updates as they happen

      // For demo purposes, we'll simulate some events
      const simulateEvents = () => {
        const steps = COURSE_SELECTION_FUNNEL
        let currentStepIndex = 0

        const sendStepEvent = () => {
          if (currentStepIndex >= steps.length) return

          const step = steps[currentStepIndex]
          const eventData = {
            type: 'step_enter',
            stepId: step.id,
            stepName: step.name,
            category: step.category,
            userId,
            timestamp: Date.now(),
          }

          controller.enqueue(encoder.encode(`data: ${JSON.stringify(eventData)}\n\n`))
          currentStepIndex++

          // Schedule next event
          if (currentStepIndex < steps.length) {
            setTimeout(sendStepEvent, Math.random() * 30000 + 10000) // 10-40 seconds
          }
        }

        // Start simulation after a short delay
        setTimeout(sendStepEvent, 5000)
      }

      // Only simulate if in development mode
      if (process.env.NODE_ENV === 'development') {
        simulateEvents()
      }

      // Send periodic heartbeat
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: 'heartbeat',
                timestamp: Date.now(),
              })}\n\n`
            )
          )
        } catch (error) {
          clearInterval(heartbeat)
        }
      }, 30000) // Every 30 seconds

      // Cleanup function
      const cleanup = () => {
        clearInterval(heartbeat)
        try {
          controller.close()
        } catch (error) {
          // Stream already closed
        }
      }

      // Set cleanup timeout
      setTimeout(cleanup, 300000) // 5 minutes max connection time

      return cleanup
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    },
  })
}
