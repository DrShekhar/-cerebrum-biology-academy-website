/**
 * Test Results API with AI-Powered Insights
 * Provides detailed test results, analytics, and personalized recommendations
 */

import { Anthropic } from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma/index.js'

const prisma = new PrismaClient()

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

interface DetailedResults {
  testId: string
  testInfo: {
    title: string
    completedAt: string
    duration: number
    totalQuestions: number
  }
  performance: {
    totalScore: number
    totalMarks: number
    percentage: number
    correctAnswers: number
    incorrectAnswers: number
    unattempted: number
    timeSpent: number
    averageTimePerQuestion: number
  }
  topicWiseAnalysis: Array<{
    topic: string
    attempted: number
    correct: number
    incorrect: number
    accuracy: number
    timeSpent: number
  }>
  difficultyAnalysis: {
    easy: { attempted: number; correct: number; accuracy: number }
    medium: { attempted: number; correct: number; accuracy: number }
    hard: { attempted: number; correct: number; accuracy: number }
  }
  questionDetails: Array<{
    questionId: string
    question: string
    topic: string
    difficulty: string
    yourAnswer: string
    correctAnswer: string
    isCorrect: boolean
    explanation?: string
    marksAwarded: number
    timeSpent: number
  }>
  aiInsights: {
    overallAssessment: string
    strengths: string[]
    areasToImprove: string[]
    studyPlan: Array<{
      topic: string
      priority: 'high' | 'medium' | 'low'
      recommendations: string[]
    }>
    motivationalMessage: string
    nextSteps: string[]
  }
  comparativeAnalysis: {
    percentileRank?: number
    averageScore?: number
    yourScore: number
    performanceTrend: string
  }
}

/**
 * Generate comprehensive AI insights for test results
 */
async function generateDetailedAIInsights(
  studentId: string,
  testResults: any,
  topicPerformance: any[],
  previousTests: any[]
) {
  const weakTopics = topicPerformance
    .filter((t) => t.accuracy < 60)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 5)

  const strongTopics = topicPerformance
    .filter((t) => t.accuracy >= 70)
    .sort((a, b) => b.accuracy - a.accuracy)
    .slice(0, 3)

  const performanceTrend =
    previousTests.length > 0
      ? previousTests[0].percentage > testResults.percentage
        ? 'declining'
        : 'improving'
      : 'first-test'

  const prompt = `You are an expert NEET Biology mentor analyzing a student's test performance. Provide comprehensive, personalized insights.

Test Performance:
- Score: ${testResults.totalScore}/${testResults.totalMarks} (${testResults.percentage.toFixed(1)}%)
- Correct: ${testResults.correctAnswers}, Incorrect: ${testResults.incorrectAnswers}
- Time Spent: ${Math.round(testResults.timeSpent / 60)} minutes

Topic Performance:
Strong Areas: ${strongTopics.map((t) => `${t.topic} (${t.accuracy.toFixed(1)}%)`).join(', ') || 'None yet'}
Weak Areas: ${weakTopics.map((t) => `${t.topic} (${t.accuracy.toFixed(1)}%)`).join(', ') || 'Need more practice'}

Performance Trend: ${performanceTrend}
Previous Tests: ${previousTests.length} completed

Provide a JSON response with:

{
  "overallAssessment": "2-3 sentences summarizing performance and potential",
  "strengths": ["3-4 specific strengths with examples"],
  "areasToImprove": ["3-4 specific weaknesses with root causes"],
  "studyPlan": [
    {
      "topic": "topic name",
      "priority": "high|medium|low",
      "recommendations": ["2-3 specific action items"]
    }
  ],
  "motivationalMessage": "Encouraging 2-3 sentences with specific praise and growth mindset",
  "nextSteps": ["3-4 immediate actionable steps for improvement"]
}

Be specific, encouraging, and data-driven. Focus on NEET preparation strategies.`

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const textContent = response.content.find((block) => block.type === 'text')
    if (textContent && textContent.type === 'text') {
      const jsonMatch = textContent.text.match(/\{[\s\S]*\}/s)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
    }
  } catch (error) {
    console.error('AI insights generation error:', error)
  }

  // Fallback insights
  return {
    overallAssessment: `You scored ${testResults.percentage.toFixed(1)}% in this test. ${testResults.percentage >= 70 ? 'Good performance! Keep building on this foundation.' : 'There is room for improvement with focused practice.'}`,
    strengths:
      strongTopics.length > 0
        ? strongTopics.map((t) => `Strong understanding of ${t.topic} concepts`)
        : ['Completed the test', 'Identified areas for growth'],
    areasToImprove:
      weakTopics.length > 0
        ? weakTopics.map(
            (t) => `Need to strengthen ${t.topic} - currently at ${t.accuracy.toFixed(1)}%`
          )
        : ['Focus on consistent practice across all topics'],
    studyPlan: weakTopics.slice(0, 3).map((t, i) => ({
      topic: t.topic,
      priority: i === 0 ? ('high' as const) : ('medium' as const),
      recommendations: [
        'Review NCERT chapter thoroughly',
        'Practice 20-30 questions daily',
        'Watch video lectures for concept clarity',
      ],
    })),
    motivationalMessage:
      'Every test is a stepping stone to success. Focus on learning from your mistakes and improving steadily. Your dedication will pay off!',
    nextSteps: [
      'Review all incorrect answers and understand why',
      'Focus on your top 3 weak topics this week',
      'Take another practice test in 3-4 days',
      'Maintain a study journal to track progress',
    ],
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const { testId } = await params

    if (!testId) {
      return NextResponse.json({ error: 'Test ID is required' }, { status: 400 })
    }

    // Fetch test session with all details
    const session = await prisma.testSession.findUnique({
      where: { id: testId },
      include: {
        testTemplate: true,
        responses: {
          include: {
            question: true,
          },
        },
      },
    })

    if (!session) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 })
    }

    if (session.status !== 'COMPLETED') {
      return NextResponse.json({ error: 'Test not yet completed' }, { status: 400 })
    }

    const studentId = session.userId || session.freeUserId || ''

    // Calculate performance metrics
    const totalQuestions = session.responses.length
    const correctAnswers = session.responses.filter((r) => r.isCorrect).length
    const incorrectAnswers = session.responses.filter((r) => r.isCorrect === false).length
    const unattempted = totalQuestions - (correctAnswers + incorrectAnswers)

    // Topic-wise analysis
    const topicMap = new Map<
      string,
      {
        attempted: number
        correct: number
        incorrect: number
        timeSpent: number
      }
    >()

    session.responses.forEach((response) => {
      const topic = response.question.topic
      if (!topicMap.has(topic)) {
        topicMap.set(topic, {
          attempted: 0,
          correct: 0,
          incorrect: 0,
          timeSpent: 0,
        })
      }

      const stats = topicMap.get(topic)!
      stats.attempted++
      if (response.isCorrect) {
        stats.correct++
      } else if (response.isCorrect === false) {
        stats.incorrect++
      }
      stats.timeSpent += response.timeSpent || 0
    })

    const topicWiseAnalysis = Array.from(topicMap.entries()).map(([topic, stats]) => ({
      topic,
      ...stats,
      accuracy: (stats.correct / stats.attempted) * 100,
    }))

    // Difficulty-wise analysis
    const difficultyMap = new Map<string, { attempted: number; correct: number }>()
    session.responses.forEach((response) => {
      const difficulty = response.question.difficulty
      if (!difficultyMap.has(difficulty)) {
        difficultyMap.set(difficulty, { attempted: 0, correct: 0 })
      }
      const stats = difficultyMap.get(difficulty)!
      stats.attempted++
      if (response.isCorrect) stats.correct++
    })

    const getDifficultyStats = (difficulty: string) => {
      const stats = difficultyMap.get(difficulty) || { attempted: 0, correct: 0 }
      return {
        attempted: stats.attempted,
        correct: stats.correct,
        accuracy: stats.attempted > 0 ? (stats.correct / stats.attempted) * 100 : 0,
      }
    }

    const difficultyAnalysis = {
      easy: getDifficultyStats('EASY'),
      medium: getDifficultyStats('MEDIUM'),
      hard: getDifficultyStats('HARD'),
    }

    // Question details
    const questionDetails = session.responses.map((response) => ({
      questionId: response.question.id,
      question: response.question.question,
      topic: response.question.topic,
      difficulty: response.question.difficulty,
      yourAnswer: response.selectedAnswer || 'Not attempted',
      correctAnswer: response.question.correctAnswer,
      isCorrect: response.isCorrect || false,
      explanation: response.question.explanation,
      marksAwarded: response.marksAwarded,
      timeSpent: response.timeSpent || 0,
    }))

    // Fetch previous tests for trend analysis
    const previousTests = await prisma.testSession.findMany({
      where: {
        OR: [{ userId: studentId }, { freeUserId: studentId }],
        status: 'COMPLETED',
        id: { not: testId },
      },
      orderBy: { submittedAt: 'desc' },
      take: 5,
      select: {
        totalScore: true,
        percentage: true,
        submittedAt: true,
      },
    })

    // Generate AI insights
    const aiInsights = await generateDetailedAIInsights(
      studentId,
      {
        totalScore: session.totalScore || 0,
        totalMarks: session.testTemplate?.totalMarks || 0,
        percentage: session.percentage || 0,
        correctAnswers,
        incorrectAnswers,
        timeSpent: session.timeSpent,
      },
      topicWiseAnalysis,
      previousTests
    )

    // Calculate percentile (simplified - would need all test takers' data)
    const averageScore = 60 // Placeholder - calculate from all test takers
    const performanceTrend =
      previousTests.length > 0
        ? previousTests[0].percentage! > session.percentage!
          ? 'declining'
          : 'improving'
        : 'first-test'

    const results: DetailedResults = {
      testId,
      testInfo: {
        title: session.testTemplate?.title || 'Practice Test',
        completedAt: session.submittedAt?.toISOString() || '',
        duration: session.testTemplate?.timeLimit || 60,
        totalQuestions,
      },
      performance: {
        totalScore: session.totalScore || 0,
        totalMarks: session.testTemplate?.totalMarks || 0,
        percentage: session.percentage || 0,
        correctAnswers,
        incorrectAnswers,
        unattempted,
        timeSpent: session.timeSpent,
        averageTimePerQuestion: totalQuestions > 0 ? session.timeSpent / totalQuestions : 0,
      },
      topicWiseAnalysis,
      difficultyAnalysis,
      questionDetails,
      aiInsights,
      comparativeAnalysis: {
        averageScore,
        yourScore: session.totalScore || 0,
        performanceTrend,
      },
    }

    console.log(`📊 Results fetched for test: ${testId}`)

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error fetching test results:', error)

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ error: 'Failed to fetch test results' }, { status: 500 })
  }
}
