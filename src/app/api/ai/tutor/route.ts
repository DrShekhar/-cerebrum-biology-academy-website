/**
 * AI Tutor API - 24/7 Personalized Biology Tutoring
 * Uses MCP servers to access biology content, student progress, and NCERT materials
 */

import { Anthropic } from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'

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
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: TutorRequest = await request.json()

    if (!body.question || !body.studentId) {
      return NextResponse.json(
        { error: 'Missing required fields: question and studentId' },
        { status: 400 }
      )
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
- Student ID: ${body.studentId}
- Current topic: ${body.context?.topic || 'General Biology'}
- Difficulty preference: ${body.context?.difficulty || 'medium'}

Available Tools (via MCP):
- query_biology_questions: Search NEET questions by topic/difficulty
- get_ncert_content: Retrieve NCERT textbook content
- get_student_weak_areas: Get student's weak topics for personalized help

Always:
- Cite NCERT references when applicable
- Suggest related practice questions
- Identify weak areas and provide targeted help
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
          console.log(
            `[AI Tutor] Retry attempt ${attempt}/${maxRetries} after ${delayMs}ms, error:`,
            error.message || error
          )
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
