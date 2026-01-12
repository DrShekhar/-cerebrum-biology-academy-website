/**
 * Test Submission API
 * Handles test submission, scoring, and AI-powered analysis
 */

import { Anthropic } from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

interface SubmitTestRequest {
  testId: string
  studentId: string
  answers: Record<string, string> // questionId -> selectedAnswer
  timeSpent: number // in seconds
}

interface QuestionResult {
  questionId: string
  isCorrect: boolean
  marksAwarded: number
  timeSpent: number
}

interface TestResults {
  testId: string
  totalScore: number
  totalMarks: number
  percentage: number
  correctAnswers: number
  incorrectAnswers: number
  unattempted: number
  timeSpent: number
  questionResults: QuestionResult[]
  topicWiseAnalysis: Record<
    string,
    {
      correct: number
      total: number
      accuracy: number
    }
  >
  aiAnalysis: {
    strengths: string[]
    weaknesses: string[]
    recommendations: string[]
    motivationalMessage: string
  }
}

/**
 * Calculate score and generate question results
 */
async function calculateScore(
  testId: string,
  answers: Record<string, string>
): Promise<{
  score: number
  totalMarks: number
  results: QuestionResult[]
  topicWise: Record<string, { correct: number; total: number }>
}> {
  // Fetch test questions
  const session = await prisma.test_sessions.findUnique({
    where: { id: testId },
    include: {
      user_question_responses: {
        include: {
          questions: true,
        },
      },
    },
  })

  if (!session) {
    throw new Error('Test session not found')
  }

  let totalScore = 0
  let totalMarks = 0
  const questionResults: QuestionResult[] = []
  const topicWise: Record<string, { correct: number; total: number }> = {}

  // Get all questions for this test
  const questionIds = Object.keys(answers)
  const questions = await prisma.questions.findMany({
    where: { id: { in: questionIds } },
  })

  for (const question of questions) {
    const studentAnswer = answers[question.id]
    const isCorrect = studentAnswer === question.correctAnswer
    const marksAwarded = isCorrect ? question.marks : 0

    totalScore += marksAwarded
    totalMarks += question.marks

    questionResults.push({
      questionId: question.id,
      isCorrect,
      marksAwarded,
      timeSpent: 0, // Will be updated if tracking individual question time
    })

    // Topic-wise tracking
    if (!topicWise[question.topic]) {
      topicWise[question.topic] = { correct: 0, total: 0 }
    }
    topicWise[question.topic].total++
    if (isCorrect) {
      topicWise[question.topic].correct++
    }

    // Save user response
    await prisma.user_question_responses.create({
      data: {
        id: `response_${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${question.id}`,
        ...(session.userId ? { userId: session.userId } : { freeUserId: session.freeUserId! }),
        questionId: question.id,
        testSessionId: testId,
        selectedAnswer: studentAnswer,
        isCorrect,
        marksAwarded,
        answeredAt: new Date(),
      },
    })
  }

  return { score: totalScore, totalMarks, results: questionResults, topicWise }
}

/**
 * Generate AI-powered performance analysis
 */
async function generateAIAnalysis(
  score: number,
  totalMarks: number,
  topicWise: Record<string, { correct: number; total: number }>,
  studentId: string
): Promise<{
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  motivationalMessage: string
}> {
  const percentage = (score / totalMarks) * 100

  // Calculate topic-wise performance
  const topicPerformance = Object.entries(topicWise).map(([topic, data]) => ({
    topic,
    accuracy: (data.correct / data.total) * 100,
    correct: data.correct,
    total: data.total,
  }))

  const strongTopics = topicPerformance.filter((t) => t.accuracy >= 70)
  const weakTopics = topicPerformance.filter((t) => t.accuracy < 60)

  const prompt = `Analyze this NEET Biology test performance and provide personalized feedback:

Test Performance:
- Score: ${score}/${totalMarks} (${percentage.toFixed(1)}%)
- Strong Topics: ${strongTopics.map((t) => `${t.topic} (${t.accuracy.toFixed(1)}%)`).join(', ') || 'None yet'}
- Weak Topics: ${weakTopics.map((t) => `${t.topic} (${t.accuracy.toFixed(1)}%)`).join(', ') || 'None'}

Provide a JSON response with:
1. "strengths": Array of 2-3 specific strengths identified
2. "weaknesses": Array of 2-3 areas needing improvement
3. "recommendations": Array of 3-4 specific, actionable study recommendations
4. "motivationalMessage": One encouraging message (2-3 sentences)

Be specific, encouraging, and actionable. Format as valid JSON only.`

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const textContent = response.content.find((block) => block.type === 'text')
    if (textContent && textContent.type === 'text') {
      const jsonMatch = textContent.text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
    }
  } catch (error) {
    console.error('AI analysis error:', error)
  }

  // Fallback analysis
  return {
    strengths:
      strongTopics.length > 0
        ? [`Strong performance in ${strongTopics[0].topic}`, 'Good conceptual understanding']
        : ['Completed the test', 'Identified areas for improvement'],
    weaknesses:
      weakTopics.length > 0
        ? weakTopics.slice(0, 3).map((t) => `Need to improve ${t.topic}`)
        : ['Focus on consistent practice'],
    recommendations: [
      'Review incorrect answers thoroughly',
      'Focus on NCERT concepts for weak topics',
      'Practice more questions in low-scoring areas',
      'Take regular mock tests to track improvement',
    ],
    motivationalMessage:
      percentage >= 70
        ? 'Great job! You are making excellent progress. Keep up the consistent effort and focus on your weak areas to achieve even better results.'
        : 'Every test is a learning opportunity. Focus on understanding your mistakes and improving step by step. Consistent practice will lead to success!',
  }
}

/**
 * Update student progress based on test performance
 */
async function updateStudentProgress(
  studentId: string,
  topicWise: Record<string, { correct: number; total: number }>
) {
  for (const [topic, data] of Object.entries(topicWise)) {
    const accuracy = (data.correct / data.total) * 100

    const existing = await prisma.user_progress.findFirst({
      where: {
        OR: [{ userId: studentId }, { freeUserId: studentId }],
        topic,
        curriculum: 'NEET',
      },
    })

    if (existing) {
      // Update existing progress
      const newTotal = existing.totalQuestions + data.total
      const newCorrect = existing.correctAnswers + data.correct
      const newAccuracy = (newCorrect / newTotal) * 100

      await prisma.user_progress.update({
        where: { id: existing.id },
        data: {
          totalQuestions: newTotal,
          correctAnswers: newCorrect,
          accuracy: newAccuracy,
          lastPracticed: new Date(),
          updatedAt: new Date(),
        },
      })
    } else {
      // Create new progress entry
      await prisma.user_progress.create({
        data: {
          id: `progress_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          ...(studentId.startsWith('user_') ? { userId: studentId } : { freeUserId: studentId }),
          topic,
          curriculum: 'NEET',
          grade: 'CLASS_12',
          totalQuestions: data.total,
          correctAnswers: data.correct,
          accuracy,
          lastPracticed: new Date(),
          updatedAt: new Date(),
        },
      })
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: SubmitTestRequest = await request.json()
    const { testId, studentId, answers, timeSpent } = body

    if (!testId || !studentId || !answers) {
      return NextResponse.json(
        { error: 'Missing required fields: testId, studentId, and answers' },
        { status: 400 }
      )
    }

    console.log(`📝 Processing test submission: ${testId} for student ${studentId}`)

    // Calculate score
    const { score, totalMarks, results, topicWise } = await calculateScore(testId, answers)

    const percentage = (score / totalMarks) * 100
    const correctAnswers = results.filter((r) => r.isCorrect).length
    const incorrectAnswers = results.filter((r) => !r.isCorrect).length
    const totalQuestions = Object.keys(answers).length

    // Update test session
    await prisma.test_sessions.update({
      where: { id: testId },
      data: {
        status: 'COMPLETED',
        submittedAt: new Date(),
        timeSpent,
        totalScore: score,
        percentage,
        updatedAt: new Date(),
      },
    })

    // Generate AI analysis
    const aiAnalysis = await generateAIAnalysis(score, totalMarks, topicWise, studentId)

    // Update student progress
    await updateStudentProgress(studentId, topicWise)

    // Create test analytics
    const topicAnalysis: Record<string, { correct: number; total: number; accuracy: number }> = {}
    for (const [topic, data] of Object.entries(topicWise)) {
      topicAnalysis[topic] = {
        ...data,
        accuracy: (data.correct / data.total) * 100,
      }
    }

    const testResults: TestResults = {
      testId,
      totalScore: score,
      totalMarks,
      percentage,
      correctAnswers,
      incorrectAnswers,
      unattempted: 0, // Can be calculated if we track total questions
      timeSpent,
      questionResults: results,
      topicWiseAnalysis: topicAnalysis,
      aiAnalysis,
    }

    console.log(
      `✅ Test submitted successfully: ${score}/${totalMarks} (${percentage.toFixed(1)}%)`
    )

    return NextResponse.json(testResults)
  } catch (error) {
    console.error('❌ Test submission error:', error)

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ error: 'Failed to submit test' }, { status: 500 })
  }
}
