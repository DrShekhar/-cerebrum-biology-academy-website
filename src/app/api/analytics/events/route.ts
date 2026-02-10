import { NextRequest } from 'next/server'
import { realTimeAnalytics } from '@/lib/analytics/realTimeService'

export async function GET(request: NextRequest) {
  try {
    // Set up Server-Sent Events
    const encoder = new TextEncoder()

    const customReadable = new ReadableStream({
      start(controller) {
        // Send initial data
        const sendData = async () => {
          try {
            const liveData = await realTimeAnalytics.getLiveAnalytics()
            const dashboardStats = await realTimeAnalytics.getDashboardStats()

            const data = {
              ...liveData,
              dashboard: dashboardStats,
              timestamp: new Date().toISOString(),
            }

            controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
          } catch (error) {
            console.error('Error sending SSE data:', error)
          }
        }

        // Send initial data
        sendData()

        // Subscribe to real-time updates
        const unsubscribe = realTimeAnalytics.subscribe((data) => {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                ...data,
                timestamp: new Date().toISOString(),
              })}\n\n`
            )
          )
        })

        // Set up periodic updates every 30 seconds
        const interval = setInterval(sendData, 30000)

        // Cleanup function
        const cleanup = () => {
          clearInterval(interval)
          unsubscribe()
          controller.close()
        }

        // Store cleanup function for potential use
        ;(controller as any).cleanup = cleanup

        // Handle client disconnect
        request.signal.addEventListener('abort', cleanup)
      },
    })

    const origin = request.headers.get('origin') || ''
    const allowedOrigins = [
      'https://cerebrumbiologyacademy.com',
      'https://www.cerebrumbiologyacademy.com',
      ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
    ]
    const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0]

    return new Response(customReadable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Headers': 'Cache-Control',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
  } catch (error) {
    console.error('Error setting up SSE:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
