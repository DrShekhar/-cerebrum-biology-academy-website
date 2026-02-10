import { NextRequest } from 'next/server'
import { streamChatResponse, createSSEEncoder } from '@/lib/ceri-ai/streaming/streamHandler'
import type { MessageParam } from '@anthropic-ai/sdk/resources/messages'
import { upstashCache, preferUpstash } from '@/lib/cache/upstash'
import { jwtVerify } from 'jose'

// Now using edge runtime with Upstash Redis for edge-compatible caching
export const runtime = 'edge'

// Rate limit tracking per user (in-memory, resets per instance)
const userRequestCounts = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_REQUESTS = 50 // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour window

/**
 * Validate user session from JWT cookie
 * Returns user ID if valid, null otherwise
 */
async function validateSession(request: NextRequest): Promise<string | null> {
  try {
    // Check for session cookie
    const sessionCookie = request.cookies.get('cerebrum_session')?.value
    if (!sessionCookie) {
      return null
    }

    // Get auth secret
    const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
    if (!secret) {
      console.error('[AI Stream] AUTH_SECRET not configured')
      return null
    }

    // Verify JWT using jose (edge-compatible)
    const secretKey = new TextEncoder().encode(secret)
    const { payload } = await jwtVerify(sessionCookie, secretKey)

    // Check expiration
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null
    }

    return (payload.userId || payload.sub) as string
  } catch (error) {
    console.error('[AI Stream] Session validation error:', error)
    return null
  }
}

/**
 * Check rate limit for user
 */
function checkRateLimit(userId: string): boolean {
  const now = Date.now()
  const userLimit = userRequestCounts.get(userId)

  if (!userLimit || now > userLimit.resetAt) {
    // Reset or initialize
    userRequestCounts.set(userId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }

  if (userLimit.count >= RATE_LIMIT_REQUESTS) {
    return false
  }

  userLimit.count++
  return true
}

// Cache key generator for chat responses
function generateCacheKey(messages: MessageParam[], userId: string): string {
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

  // Include userId in cache key to prevent cross-user cache collisions
  return `ceri:chat:${userId}:${Math.abs(hash).toString(36)}`
}

export async function POST(req: NextRequest) {
  try {
    // SECURITY: Validate user session before processing AI request
    const userId = await validateSession(req)
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'Authentication required', code: 'AUTH_REQUIRED' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // SECURITY: Rate limit per user to prevent API abuse
    if (!checkRateLimit(userId)) {
      return new Response(
        JSON.stringify({
          error: 'Rate limit exceeded. Please try again later.',
          code: 'RATE_LIMITED',
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { messages, useCache = true } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid messages format', { status: 400 })
    }

    // Check cache if enabled and Upstash is available
    if (useCache && preferUpstash() && upstashCache.isEnabled()) {
      const cacheKey = generateCacheKey(messages, userId)
      const cachedResponse = await upstashCache.get(cacheKey)

      if (cachedResponse) {

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
                const chunkText =
                  typeof chunk === 'string' ? chunk : new TextDecoder().decode(chunk)
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
            const cacheKey = generateCacheKey(messages, userId)
            await upstashCache.set(cacheKey, fullResponse, 3600) // Cache for 1 hour
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
