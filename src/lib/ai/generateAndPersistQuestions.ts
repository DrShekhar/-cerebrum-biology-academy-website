/**
 * AI question generation for teacher assigned-tests.
 *
 * Generates NEET-Biology MCQs with Claude (Sonnet), validates them, and persists
 * them as real `questions` rows so they can be attached to a test assignment
 * (test_assignment_questions.questionId is a FK to questions.id). Generated rows
 * are marked source=AI_GENERATED + isVerified=false so they're auditable and can
 * be reviewed before being trusted as canonical bank content.
 */

import Anthropic from '@anthropic-ai/sdk'
import { SONNET } from '@/lib/ai/models'
import { prisma } from '@/lib/prisma'

let _client: Anthropic | null = null
function getClient(): Anthropic {
  if (!_client) _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
  return _client
}

export interface GenerateQuestionsInput {
  topics: string[]
  count: number
  difficulty?: string // EASY | MEDIUM | HARD | MIXED
  grade?: string // e.g. CLASS_12
  curriculum?: string // e.g. NEET
}

interface GeneratedMCQ {
  question: string
  options: string[]
  correctAnswer: string
  explanation?: string
  topic?: string
}

/** Extract and parse the first JSON array in the model output (tolerates fences/prose). */
function parseJsonArray(text: string): unknown[] {
  const fenced = text.replace(/```(?:json)?/gi, '')
  const start = fenced.indexOf('[')
  const end = fenced.lastIndexOf(']')
  if (start === -1 || end === -1 || end <= start) return []
  try {
    const parsed = JSON.parse(fenced.slice(start, end + 1))
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function isValidMCQ(q: any): q is GeneratedMCQ {
  return (
    q &&
    typeof q.question === 'string' &&
    q.question.trim().length > 0 &&
    Array.isArray(q.options) &&
    q.options.length === 4 &&
    q.options.every((o: any) => typeof o === 'string' && o.trim().length > 0) &&
    typeof q.correctAnswer === 'string' &&
    q.options.includes(q.correctAnswer)
  )
}

/**
 * Returns the ids of newly-created `questions` rows. Returns [] if the API key
 * is missing or generation/parsing fails (caller falls back to the DB bank).
 */
export async function generateAndPersistQuestions(input: GenerateQuestionsInput): Promise<string[]> {
  if (!process.env.ANTHROPIC_API_KEY) return []

  const count = Math.min(Math.max(Math.round(input.count) || 5, 1), 30)
  const topics = (input.topics || []).map((t) => String(t).trim()).filter(Boolean)
  const topicLine = topics.length > 0 ? topics.join(', ') : 'NEET Biology (NCERT)'
  const difficulty = (input.difficulty || 'MEDIUM').toString().toLowerCase()
  const grade = input.grade || 'CLASS_12'
  const curriculum = input.curriculum || 'NEET'

  const prompt = `You are an expert NEET Biology question setter. Generate exactly ${count} high-quality, NCERT-aligned multiple-choice questions (MCQs).
Topics: ${topicLine}.
Difficulty: ${difficulty}.
Rules:
- Each question has exactly 4 options.
- correctAnswer MUST be one of the 4 option strings, copied verbatim.
- Include a concise, correct explanation.
- No duplicate questions.
Return ONLY a JSON array (no prose, no markdown fences). Each element:
{"question": string, "options": [string, string, string, string], "correctAnswer": string, "explanation": string, "topic": string}`

  let text = ''
  try {
    const resp = await getClient().messages.create({
      model: SONNET,
      max_tokens: 8000,
      messages: [{ role: 'user', content: prompt }],
    })
    text = resp.content
      .filter((b) => b.type === 'text')
      .map((b) => (b as { text: string }).text)
      .join('')
  } catch (err) {
    console.error('AI question generation failed:', err)
    return []
  }

  const valid = parseJsonArray(text).filter(isValidMCQ) as GeneratedMCQ[]
  if (valid.length === 0) return []

  const created: string[] = []
  for (let i = 0; i < valid.length && created.length < count; i++) {
    const q = valid[i]
    const id = `q_ai_${Date.now()}_${i}_${Math.random().toString(36).slice(2, 9)}`
    try {
      await prisma.questions.create({
        data: {
          id,
          topic: (q.topic && q.topic.trim()) || topics[0] || 'NEET Biology',
          curriculum,
          grade,
          type: 'MCQ',
          question: q.question.trim(),
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation?.trim() || null,
          source: 'AI_GENERATED',
          subject: 'biology',
          isActive: true,
          isVerified: false,
          updatedAt: new Date(),
        },
      })
      created.push(id)
    } catch (err) {
      console.error('Failed to persist a generated question:', err)
    }
  }

  return created
}
