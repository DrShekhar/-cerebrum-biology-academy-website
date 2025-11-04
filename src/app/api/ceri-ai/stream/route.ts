import { NextRequest } from 'next/server'
import { streamChatResponse, createSSEEncoder } from '@/lib/ceri-ai/streaming/streamHandler'
import type { MessageParam } from '@anthropic-ai/sdk/resources/messages'

// Using Node.js runtime for now (edge runtime doesn't support ioredis)
// TODO: Migrate to Upstash Redis for edge-compatible caching
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid messages format', { status: 400 })
    }

    // TODO: Re-enable Redis caching once we migrate to Upstash Redis Edge
    // For now, skip caching to get the chat working
    // const lastMessage = messages[messages.length - 1]
    // const cacheKey = CacheKeys.chatResponse(lastMessage.content as string)

    // Stream new response
    const encoder = createSSEEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamChatResponse(messages as MessageParam[], {
            model: 'claude-sonnet-4-20250514',
            maxTokens: 4096,
            temperature: 0.7,
          })) {
            controller.enqueue(chunk)
          }

          // TODO: Re-enable caching once Redis is configured for Node.js runtime
          // if (useCache && fullResponse) {
          //   await setCache(cacheKey, fullResponse, 3600)
          // }

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
