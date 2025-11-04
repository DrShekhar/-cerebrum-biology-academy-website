import { NextRequest } from 'next/server'
import { streamChatResponse, createSSEEncoder } from '@/lib/ceri-ai/streaming/streamHandler'
import { getCached, setCache, CacheKeys } from '@/lib/ceri-ai/cache/redis'
import type { MessageParam } from '@anthropic-ai/sdk/resources/messages'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const { messages, useCache = true } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid messages format', { status: 400 })
    }

    // Check cache for identical recent queries
    const lastMessage = messages[messages.length - 1]
    const cacheKey = CacheKeys.chatResponse(lastMessage.content as string)

    if (useCache) {
      const cached = await getCached<string>(cacheKey)
      if (cached) {
        // Return cached response as SSE
        const encoder = new TextEncoder()
        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: cached })}\n\n`))
            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
            controller.close()
          },
        })

        return new Response(stream, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
          },
        })
      }
    }

    // Stream new response
    let fullResponse = ''
    const encoder = createSSEEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamChatResponse(messages as MessageParam[], {
            model: 'claude-sonnet-4-20250514',
            maxTokens: 4096,
            temperature: 0.7,
          })) {
            fullResponse += chunk
            controller.enqueue(chunk)
          }

          // Cache the complete response
          if (useCache && fullResponse) {
            await setCache(cacheKey, fullResponse, 3600) // 1 hour TTL
          }

          controller.close()
        } catch (error) {
          console.error('Streaming error:', error)
          controller.error(error)
        }
      },
    })

    const encodedStream = stream.pipeThrough(encoder)

    return new Response(encodedStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('API Error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
