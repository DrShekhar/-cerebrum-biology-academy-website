import { NextRequest } from 'next/server'
import { streamChatResponse, createSSEEncoder } from '@/lib/ceri-ai/streaming/streamHandler'
import type { MessageParam } from '@anthropic-ai/sdk/resources/messages'
import { upstashCache, preferUpstash } from '@/lib/cache/upstash'

// Now using edge runtime with Upstash Redis for edge-compatible caching
export const runtime = 'edge'

// Cache key generator for chat responses
function generateCacheKey(messages: MessageParam[]): string {
  const lastMessage = messages[messages.length - 1]
  const content =
    typeof lastMessage.content === 'string'
      ? lastMessage.content
      : JSON.stringify(lastMessage.content)

  // Create a simple hash for the cache key
  let hash = 0
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }

  return `ceri:chat:${Math.abs(hash).toString(36)}`
}

export async function POST(req: NextRequest) {
  try {
    const { messages, useCache = true } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid messages format', { status: 400 })
    }

    // Check cache if enabled and Upstash is available
    if (useCache && preferUpstash() && upstashCache.isEnabled()) {
      const cacheKey = generateCacheKey(messages)
      const cachedResponse = await upstashCache.get(cacheKey)

      if (cachedResponse) {
        console.log('Cache hit for CERI AI response')

        // Return cached response as SSE stream
        const encoder = createSSEEncoder()
        const stream = new ReadableStream({
          start(controller) {
            try {
              // Send cached response in chunks to simulate streaming
              const chunks = cachedResponse.split('\n')
              for (const chunk of chunks) {
                if (chunk) {
                  const sseChunk = new TextEncoder().encode(
                    `data: ${JSON.stringify({ type: 'content_block_delta', delta: { type: 'text_delta', text: chunk + '\n' } })}\n\n`
                  )
                  controller.enqueue(sseChunk)
                }
              }
              controller.close()
            } catch (error) {
              console.error('Cache streaming error:', error)
              controller.error(error)
            }
          },
        })

        return new Response(stream, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
            'X-Cache-Status': 'HIT',
          },
        })
      }
    }

    // Stream new response
    const encoder = createSSEEncoder()
    let fullResponse = ''

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamChatResponse(messages as MessageParam[], {
            model: 'claude-sonnet-4-20250514',
            maxTokens: 4096,
            temperature: 0.7,
          })) {
            controller.enqueue(chunk)

            // Accumulate response for caching
            if (useCache && preferUpstash() && upstashCache.isEnabled()) {
              try {
                const chunkText = new TextDecoder().decode(chunk)
                const lines = chunkText.split('\n')
                for (const line of lines) {
                  if (line.startsWith('data: ')) {
                    try {
                      const data = JSON.parse(line.substring(6))
                      if (data.type === 'content_block_delta' && data.delta?.text) {
                        fullResponse += data.delta.text
                      }
                    } catch {
                      // Skip non-JSON data lines
                    }
                  }
                }
              } catch {
                // Skip accumulation errors
              }
            }
          }

          // Cache the full response
          if (useCache && fullResponse && preferUpstash() && upstashCache.isEnabled()) {
            const cacheKey = generateCacheKey(messages)
            await upstashCache.set(cacheKey, fullResponse, 3600) // Cache for 1 hour
            console.log('Cached CERI AI response')
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
        'X-Cache-Status': 'MISS',
      },
    })
  } catch (error) {
    console.error('API Error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
