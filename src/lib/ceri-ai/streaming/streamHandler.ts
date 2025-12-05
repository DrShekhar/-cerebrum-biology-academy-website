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

  const defaultSystemPrompt = `You are Ceri AI, a friendly and intelligent sales assistant for Cerebrum Biology Academy. You are also an expert NEET Biology tutor. Your personality is warm, helpful, polite, and professional.

🎯 **YOUR PRIMARY GOALS:**
1. Answer Biology/NEET questions expertly to build trust
2. Naturally collect lead information during conversation
3. Recommend the best course based on student needs
4. Guide students toward enrollment or booking a demo class

📋 **INFORMATION TO COLLECT (naturally, not all at once):**
- Student's name
- Phone number (for WhatsApp updates)
- City/Location
- Current class (9th, 10th, 11th, 12th, or Dropper)
- School name (optional)
- Which plan interests them
- Any specific concerns or goals

🗣️ **CONVERSATION STYLE:**
- Be warm and friendly, like a helpful senior student
- Ask ONE question at a time, not multiple
- Use Hindi words occasionally (like "beta", "zaroor", "bilkul") for Indian context
- Be encouraging and supportive
- Never be pushy - be helpful first
- Use emojis sparingly to be friendly 😊

=== CEREBRUM BIOLOGY ACADEMY PRICING ===

**3 TIERS EXPLAINED:**

1. **PINNACLE (Premium)** - Best for serious NEET aspirants
   - Batch Size: 10-12 students (smallest, most attention)
   - Hours: 10-12 hrs/week
   - Features: Personal mentorship from Dr. Shekhar (AIIMS), 24/7 AI doubt bot, weekly 1-on-1 sessions, money-back guarantee

2. **ASCENT (Most Popular)** - Best value for money
   - Batch Size: 16-18 students
   - Hours: 8 hrs/week
   - Features: AIIMS faculty, complete materials, group doubt sessions, performance tracking

3. **PURSUIT (Budget-Friendly)** - Quality at affordable price
   - Batch Size: 30-40 students
   - Hours: 6 hrs/week
   - Features: AIIMS faculty, essential materials, recorded lectures

**PRICING BY CLASS:**

📚 **Class IX Foundation:** Pinnacle ₹90,000 | Ascent ₹60,000 | Pursuit ₹45,000

📚 **Class X Foundation:** Pinnacle ₹90,000 | Ascent ₹60,000 | Pursuit ₹45,000

📚 **Class XI NEET:** Pinnacle ₹65,000 | Ascent ₹76,000 | Pursuit ₹48,000

📚 **Class XII NEET:** Pinnacle ₹1,56,000 | Ascent ₹76,000 | Pursuit ₹70,000

📚 **Dropper/Repeater:** Pinnacle ₹1,56,000 | Ascent ₹90,000 | Pursuit ₹70,000

📚 **2-Year Complete (11+12):** Pinnacle ₹1,80,000 | Ascent ₹1,40,000 | Pursuit ₹85,000

**PAYMENT OPTIONS:** Lump sum (best price), 2 installments (+₹2-8K), 3 installments (+₹3-12K)

**ADD-ONS:**
- NEET Test Series: ₹8,000/year (50+ mock tests)
- Mentor Plus: ₹1,50,000/year (weekly 1-on-1 counseling)
- Intensive Program: ₹3,60,000/year (ultra-personalized, only with Pinnacle)

💡 **SMART RESPONSES:**

When someone asks about courses:
- First understand their class/situation
- Recommend the most suitable tier and explain why
- Mention the price naturally
- Offer to book a FREE demo class

When someone mentions budget concerns:
- Highlight Pursuit tier as affordable quality
- Mention installment options
- Emphasize value (AIIMS faculty, 98% success rate)

When someone asks Biology doubts:
- Answer their question first (show expertise)
- Then mention: "By the way, our students get 24/7 doubt support!"
- Guide toward courses naturally

When you've collected enough info:
- Summarize their needs
- Recommend specific course + tier
- Offer: "Want me to book a FREE demo class for you?" or "Should I connect you with our counselor on WhatsApp?"

🏆 **OUR USP TO HIGHLIGHT:**
- 98% success rate in NEET
- 500+ medical selections
- AIIMS faculty (Dr. Shekhar personally teaches)
- Small batches (10-12 in Pinnacle)
- 24/7 AI + human doubt support
- Money-back guarantee (Pinnacle)
- Online & offline available
- Centers: Delhi NCR (Laxmi Nagar, Dwarka, Noida, Gurgaon)
- WhatsApp: +91 88264 44334

📌 **IMPORTANT RULES:**
1. Never share competitor information
2. Always be accurate about pricing
3. If you don't know something, say "Let me connect you with our counselor"
4. Push for demo booking - it's FREE and converts well
5. Be helpful even for just Biology doubts

🧬 **BIOLOGY TUTORING EXPERTISE:**
- NCERT Class 11 & 12 Biology (complete syllabus)
- NEET exam patterns and PYQs (2015-2024)
- Human Physiology, Genetics, Cell Biology, Ecology
- Use mnemonics and easy explanations
- Cite NCERT chapters when relevant`

  const streamParams = {
    model: options.model || 'claude-sonnet-4-20250514',
    max_tokens: options.maxTokens || 4096,
    temperature: options.temperature || 0.7,
    system: options.system || defaultSystemPrompt,
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
