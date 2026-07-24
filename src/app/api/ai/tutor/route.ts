/**
 * AI Tutor API - 24/7 Personalized Biology Tutoring
 *
 * Cost controls: per-IP hourly rate limit + per-user daily message cap
 * (counted from chat_history). Personalization is REAL — the student's weak
 * topics are queried from user_question_responses and injected into the
 * prompt. (The old prompt advertised MCP tools that were never wired.)
 */

import { Anthropic } from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rateLimit'

const DAILY_MESSAGE_CAP = 50

// Lazy initialize Anthropic client for better tree-shaking
let _anthropic: Anthropic | null = null
function getAnthropicClient(): Anthropic {
  if (!_anthropic) {
    _anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || '' })
  }
  return _anthropic
}

interface TutorRequest {
  question: string
  studentId: string
  context?: {
    topic?: string
    difficulty?: 'easy' | 'medium' | 'hard'
    previousQuestions?: string[]
  }
}

interface TutorResponse {
  answer: string
  relatedTopics: string[]
  suggestedQuestions: string[]
  ncertReferences: string[]
  confidence: number
  tokensUsed: number
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const sessionUserId = session.user.id

    // COST CONTROL 1: per-IP hourly rate limit
    const rateLimitResult = await rateLimit(request, {
      maxRequests: 20,
      windowMs: 60 * 60 * 1000,
    })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many questions this hour — take a short break and come back!' },
        { status: 429 }
      )
    }

    // COST CONTROL 2: per-user daily cap, counted from saved chat history
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)
    const todayCount = await prisma.chat_history
      .count({
        where: { userId: sessionUserId, isUserMessage: true, createdAt: { gte: startOfDay } },
      })
      .catch(() => 0)
    if (todayCount >= DAILY_MESSAGE_CAP) {
      return NextResponse.json(
        {
          error: `Daily limit of ${DAILY_MESSAGE_CAP} questions reached. Your tutor will be ready again tomorrow!`,
        },
        { status: 429 }
      )
    }

    const body: TutorRequest = await request.json()

    if (!body.question) {
      return NextResponse.json({ error: 'Missing required field: question' }, { status: 400 })
    }

    // REAL personalization: the student's weakest topics from their actual
    // question responses (CBT + assigned tests). Replaces the old prompt's
    // claims about MCP tools that were never wired to anything.
    let weakAreasLine = ''
    try {
      const weakRows = await prisma.$queryRaw<{ topic: string; accuracy: number }[]>`
        SELECT q.topic,
          ROUND(100.0 * SUM(CASE WHEN uqr."isCorrect" THEN 1 ELSE 0 END) / COUNT(*))::int AS accuracy
        FROM user_question_responses uqr
        JOIN questions q ON q.id = uqr."questionId"
        WHERE uqr."userId" = ${sessionUserId} AND q.topic IS NOT NULL
        GROUP BY q.topic
        HAVING COUNT(*) >= 3
        ORDER BY accuracy ASC
        LIMIT 5
      `
      if (weakRows.length > 0) {
        weakAreasLine = `- Weakest topics from their recent test performance (accuracy %): ${weakRows
          .map((r) => `${r.topic} (${r.accuracy}%)`)
          .join(', ')}. Weave targeted reinforcement of these into your answers when relevant.`
      }
    } catch {
      // weak-area lookup is best-effort personalization only
    }

    // Prepare system prompt for NEET Biology expert tutor
    const systemPrompt = `You are an expert NEET Biology tutor with deep knowledge of:
- NCERT Class 11 & 12 Biology (complete syllabus)
- NEET exam patterns and previous year questions
- Indian education system and student challenges
- Clear, step-by-step explanations

Your teaching style:
1. Start with the core concept in simple terms
2. Provide NCERT references for foundational knowledge
3. Use analogies and real-world examples
4. Break complex topics into digestible parts
5. Encourage critical thinking with follow-up questions
6. Be empathetic and supportive

Student Context:
- Current topic: ${body.context?.topic || 'General Biology'}
- Difficulty preference: ${body.context?.difficulty || 'medium'}
${weakAreasLine}

Always:
- Cite NCERT chapter references when applicable (only ones you are certain of)
- Suggest related practice questions
- Maintain accuracy (no hallucinations!)
- Be encouraging and supportive`

    const createMessageWithRetry = async (attempt = 1, maxRetries = 3): Promise<any> => {
      try {
        return await getAnthropicClient().messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2048,
          system: systemPrompt,
          messages: [
            {
              role: 'user',
              content: body.question,
            },
          ],
        })
      } catch (error: any) {
        const isRetryable =
          error?.status >= 500 ||
          error?.status === 429 ||
          error?.code === 'ECONNRESET' ||
          error?.code === 'ETIMEDOUT'

        if (isRetryable && attempt < maxRetries) {
          const delayMs = 1000 * Math.pow(2, attempt - 1)
          await new Promise((resolve) => setTimeout(resolve, delayMs))
          return createMessageWithRetry(attempt + 1, maxRetries)
        }

        throw error
      }
    }

    const response = await createMessageWithRetry()

    // Extract response text
    const answerContent = response.content.find((block) => block.type === 'text')
    const answer =
      answerContent?.type === 'text' ? answerContent.text : 'Unable to generate response'

    // Parse response to extract structured information
    const relatedTopics = extractRelatedTopics(answer)
    const suggestedQuestions = extractSuggestedQuestions(answer)
    const ncertReferences = extractNCERTReferences(answer)

    // Calculate confidence based on response characteristics
    const confidence = calculateConfidence(answer, body.question)

    const tutorResponse: TutorResponse = {
      answer,
      relatedTopics,
      suggestedQuestions,
      ncertReferences,
      confidence,
      tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
    }

    return NextResponse.json(tutorResponse)
  } catch (error) {
    console.error('AI Tutor error:', error)

    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json({ error: 'AI service configuration error' }, { status: 500 })
    }

    return NextResponse.json(
      {
        error: 'Failed to generate response. Please try again.',
      },
      { status: 500 }
    )
  }
}

// Helper function to extract related topics from response
function extractRelatedTopics(text: string): string[] {
  const topics: string[] = []

  // Look for topic mentions (simple keyword extraction)
  const topicKeywords = [
    'Cell Biology',
    'Genetics',
    'Evolution',
    'Ecology',
    'Plant Physiology',
    'Human Physiology',
    'Reproduction',
    'Biotechnology',
    'Molecular Biology',
    'Photosynthesis',
    'Respiration',
    'DNA',
    'RNA',
    'Protein Synthesis',
    'Mendel',
    'Natural Selection',
  ]

  topicKeywords.forEach((topic) => {
    if (text.toLowerCase().includes(topic.toLowerCase())) {
      topics.push(topic)
    }
  })

  return [...new Set(topics)].slice(0, 5) // Return unique topics, max 5
}

// Helper function to extract suggested questions
function extractSuggestedQuestions(text: string): string[] {
  const questions: string[] = []

  // Look for question patterns
  const questionPatterns = [
    /Try this:\s*"([^"]+\?)/gi,
    /Practice:\s*"([^"]+\?)/gi,
    /Next question:\s*"([^"]+\?)/gi,
    /Consider:\s*([^.]+\?)/gi,
  ]

  questionPatterns.forEach((pattern) => {
    const matches = text.matchAll(pattern)
    for (const match of matches) {
      if (match[1]) {
        questions.push(match[1].trim())
      }
    }
  })

  return questions.slice(0, 3) // Return max 3 questions
}

// Helper function to extract NCERT references
function extractNCERTReferences(text: string): string[] {
  const references: string[] = []

  // Look for NCERT references
  const referencePatterns = [
    /NCERT\s+Class\s+(\d+)[,\s]+Chapter\s+(\d+)[:\s]+([^.\n]+)/gi,
    /Class\s+(\d+)[,\s]+Chapter\s+(\d+)[:\s]+([^.\n]+)/gi,
  ]

  referencePatterns.forEach((pattern) => {
    const matches = text.matchAll(pattern)
    for (const match of matches) {
      references.push(`NCERT Class ${match[1]}, Chapter ${match[2]}: ${match[3].trim()}`)
    }
  })

  return [...new Set(references)].slice(0, 5) // Return unique references, max 5
}

// Helper function to calculate confidence score
function calculateConfidence(answer: string, question: string): number {
  let confidence = 70 // Base confidence

  // Increase confidence if answer is detailed (>500 chars)
  if (answer.length > 500) confidence += 10

  // Increase confidence if answer includes NCERT references
  if (answer.toLowerCase().includes('ncert')) confidence += 10

  // Increase confidence if answer includes specific terms from question
  const questionWords = question.toLowerCase().split(/\s+/)
  const answerLower = answer.toLowerCase()
  const matchedWords = questionWords.filter((word) => answerLower.includes(word)).length
  confidence += Math.min(matchedWords * 2, 10)

  return Math.min(confidence, 100) // Cap at 100
}

// GET endpoint for health check
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'AI Tutor API',
    model: 'claude-sonnet-4-20250514',
    capabilities: [
      '24/7 doubt clearing',
      'NCERT content access',
      'Personalized learning',
      'NEET question bank access',
      'Weak area identification',
    ],
    timestamp: new Date().toISOString(),
  })
}
