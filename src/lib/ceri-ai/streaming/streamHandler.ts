import Anthropic from '@anthropic-ai/sdk'

export interface StreamOptions {
  model?: string
  maxTokens?: number
  temperature?: number
  system?: string
  maxRetries?: number
  retryDelayMs?: number
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function createStreamWithRetry(
  anthropic: Anthropic,
  params: any,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<any> {
  let lastError: any

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const stream = await anthropic.messages.stream(params)
      return stream
    } catch (error: any) {
      lastError = error

      const isRetryable =
        error?.status >= 500 ||
        error?.status === 429 ||
        error?.code === 'ECONNRESET' ||
        error?.code === 'ETIMEDOUT' ||
        error?.name === 'AbortError'

      if (!isRetryable || attempt === maxRetries - 1) {
        throw error
      }

      const delayMs = initialDelay * Math.pow(2, attempt)
      console.log(
        `Stream creation failed (attempt ${attempt + 1}/${maxRetries}), retrying in ${delayMs}ms...`,
        error.message || error
      )
      await delay(delayMs)
    }
  }

  throw lastError || new Error('Failed to create stream after retries')
}

export async function* streamChatResponse(
  messages: Anthropic.MessageParam[],
  options: StreamOptions = {}
): AsyncGenerator<string, void, unknown> {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || '',
  })

  const maxRetries = options.maxRetries || 3
  const retryDelayMs = options.retryDelayMs || 1000

  const streamParams = {
    model: options.model || 'claude-sonnet-4-20250514',
    max_tokens: options.maxTokens || 4096,
    temperature: options.temperature || 0.7,
    system:
      options.system ||
      'You are Ceri, an AI tutor specialized in NEET Biology. You provide clear, accurate explanations with examples.',
    messages,
  }

  const stream = await createStreamWithRetry(anthropic, streamParams, maxRetries, retryDelayMs)

  for await (const chunk of stream) {
    if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
      yield chunk.delta.text
    }
  }
}

// Create Server-Sent Events (SSE) encoder
export function createSSEEncoder(): TransformStream<string, Uint8Array> {
  const encoder = new TextEncoder()

  return new TransformStream({
    transform(chunk, controller) {
      const data = `data: ${JSON.stringify({ text: chunk })}\n\n`
      controller.enqueue(encoder.encode(data))
    },
    flush(controller) {
      const data = 'data: [DONE]\n\n'
      controller.enqueue(encoder.encode(data))
    },
  })
}

// Parse SSE responses on client side
export async function parseSSEResponse(
  response: Response,
  onChunk: (text: string) => void,
  onComplete?: () => void,
  onError?: (error: Error) => void
): Promise<void> {
  const reader = response.body?.getReader()
  const decoder = new TextDecoder()

  if (!reader) {
    throw new Error('Response body is not readable')
  }

  try {
    while (true) {
      const { done, value } = await reader.read()

      if (done) {
        onComplete?.()
        break
      }

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n\n')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)

          if (data === '[DONE]') {
            onComplete?.()
            return
          }

          try {
            const parsed = JSON.parse(data)
            if (parsed.text) {
              onChunk(parsed.text)
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }
  } catch (error) {
    onError?.(error as Error)
  }
}
