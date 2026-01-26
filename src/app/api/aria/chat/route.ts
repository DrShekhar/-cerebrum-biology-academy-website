/**
 * ARIA Sales Agent - Streaming Chat API
 * AI-powered chat endpoint using Claude 3.5 Haiku for sales conversations
 */

import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getSystemPrompt } from '@/lib/aria/systemPrompt'
import { detectLanguage } from '@/lib/aria/translations'
import type { Language } from '@/lib/aria/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface RequestBody {
  message: string
  conversationHistory?: ChatMessage[]
  language?: Language
  context?: {
    currentPage?: string
    leadStage?: string
    leadData?: Record<string, unknown>
  }
}

const RATE_LIMIT_REQUESTS = 50
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true, remaining: RATE_LIMIT_REQUESTS - 1 }
  }

  if (record.count >= RATE_LIMIT_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: RATE_LIMIT_REQUESTS - record.count }
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded
    ? forwarded.split(',')[0].trim()
    : request.headers.get('x-real-ip') || 'unknown'
  return ip
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function createStreamWithRetry(
  anthropic: Anthropic,
  params: Anthropic.MessageCreateParamsStreaming,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<AsyncIterable<Anthropic.MessageStreamEvent>> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const stream = anthropic.messages.stream(params)
      return stream
    } catch (error: unknown) {
      lastError = error as Error
      const err = error as { status?: number; code?: string; name?: string }

      const isRetryable =
        (err.status && err.status >= 500) ||
        err.status === 429 ||
        err.code === 'ECONNRESET' ||
        err.code === 'ETIMEDOUT' ||
        err.name === 'AbortError'

      if (!isRetryable || attempt === maxRetries - 1) {
        throw error
      }

      const delayMs = initialDelay * Math.pow(2, attempt)
      console.log(
        `[ARIA] Stream creation failed (attempt ${attempt + 1}/${maxRetries}), retrying in ${delayMs}ms...`
      )
      await delay(delayMs)
    }
  }

  throw lastError || new Error('Failed to create stream after retries')
}

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request)
  const { allowed, remaining } = checkRateLimit(clientIP)

  if (!allowed) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + 3600),
      },
    })
  }

  try {
    const body = (await request.json()) as RequestBody
    const { message, conversationHistory = [], language: requestedLanguage, context } = body

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (message.length > 2000) {
      return new Response(JSON.stringify({ error: 'Message too long (max 2000 characters)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const detectedLanguage = detectLanguage(message)
    const language = requestedLanguage || detectedLanguage

    let systemPrompt = getSystemPrompt(language)

    if (context?.currentPage) {
      systemPrompt += `\n\n[CONTEXT: User is currently on the ${context.currentPage} page]`
    }
    if (context?.leadStage) {
      systemPrompt += `\n[LEAD STAGE: ${context.leadStage}]`
    }
    if (context?.leadData) {
      const leadInfo = Object.entries(context.leadData)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ')
      if (leadInfo) {
        systemPrompt += `\n[LEAD INFO: ${leadInfo}]`
      }
    }

    const messages: Anthropic.MessageParam[] = [
      ...conversationHistory.slice(-10).map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      { role: 'user' as const, content: message },
    ]

    const apiKey = process.env.ANTHROPIC_API_KEY

    if (!apiKey) {
      console.error('[ARIA] ANTHROPIC_API_KEY is not configured')
      return new Response(JSON.stringify({ error: 'AI service not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const anthropic = new Anthropic({ apiKey })

    const stream = await createStreamWithRetry(anthropic, {
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 1024,
      temperature: 0.7,
      system: systemPrompt,
      messages,
      stream: true,
    })

    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta') {
              const delta = event.delta as { type: string; text?: string }
              if (delta.type === 'text_delta' && delta.text) {
                const data = `data: ${JSON.stringify({ text: delta.text, language })}\n\n`
                controller.enqueue(encoder.encode(data))
              }
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error)
          console.error('[ARIA] Stream error:', errorMessage, error)
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: `Stream error: ${errorMessage}` })}\n\n`
            )
          )
          controller.close()
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-RateLimit-Remaining': String(remaining),
      },
    })
  } catch (error) {
    console.error('[ARIA] Chat API error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const isAnthropicError = errorMessage.includes('Anthropic') || errorMessage.includes('API')

    return new Response(
      JSON.stringify({
        error: isAnthropicError
          ? 'AI service temporarily unavailable. Please try again.'
          : 'Failed to process request',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
