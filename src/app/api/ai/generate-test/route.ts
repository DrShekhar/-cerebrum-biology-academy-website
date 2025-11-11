/**
 * AI-Powered Test Generator API for Cerebrum Biology Academy
 *
 * Features:
 * - Personalized test generation based on student weak areas
 * - Intelligent question distribution (40% weak, 30% moderate, 30% strong)
 * - Claude AI integration for test personalization
 * - NEET exam pattern optimization
 * - Real-time performance tracking
 * - MCP server integration for question database access
 */

import { Anthropic } from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma/index.js'

const prisma = new PrismaClient()

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

// Request/Response Types
interface TestGenerationRequest {
  studentId: string
  testType: 'practice' | 'mock' | 'chapter' | 'weak-areas'
  config?: {
    totalQuestions?: number
    topics?: string[]
    difficulty?: 'easy' | 'medium' | 'hard' | 'mixed'
    duration?: number
    includeWeakAreas?: boolean
    examPattern?: 'neet' | 'cbse' | 'custom'
  }
}

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: string
  explanation?: string
  topic: string
  subtopic?: string
  difficulty: string
  marks: number
  timeLimit?: number
}

interface TestMetadata {
  totalQuestions: number
  totalMarks: number
  duration: number
  difficulty: string
  topics: string[]
  weakAreasTargeted: string[]
}

interface TestGenerationResponse {
  testId: string
  title: string
  description: string
  questions: Question[]
  metadata: TestMetadata
  instructions: string[]
  createdAt: string
}

// Helper Functions

/**
 * Fetch student's weak areas from database
 */
async function getStudentWeakAreas(studentId: string) {
  try {
    const weakAreas = await prisma.userProgress.findMany({
      where: {
        OR: [{ userId: studentId }, { freeUserId: studentId }],
        accuracy: { lt: 60 },
      },
      orderBy: { accuracy: 'asc' },
      take: 5,
      select: {
        topic: true,
        subtopic: true,
        accuracy: true,
        totalQuestions: true,
        correctAnswers: true,
      },
    })

    return weakAreas
  } catch (error) {
    console.error('Error fetching weak areas:', error)
    return []
  }
}

/**
 * Fetch student's recent performance
 */
async function getStudentPerformance(studentId: string) {
  try {
    const recentTests = await prisma.testSession.findMany({
      where: {
        OR: [{ userId: studentId }, { freeUserId: studentId }],
        status: 'COMPLETED',
      },
      orderBy: { submittedAt: 'desc' },
      take: 5,
      select: {
        totalScore: true,
        percentage: true,
        submittedAt: true,
        testTemplate: {
          select: {
            title: true,
            topics: true,
          },
        },
      },
    })

    return recentTests
  } catch (error) {
    console.error('Error fetching performance:', error)
    return []
  }
}

/**
 * Calculate optimal question distribution based on weak areas
 */
function calculateQuestionDistribution(totalQuestions: number, weakAreas: any[], testType: string) {
  if (testType === 'weak-areas') {
    return {
      weak: Math.floor(totalQuestions * 0.6),
      moderate: Math.floor(totalQuestions * 0.2),
      strong: Math.floor(totalQuestions * 0.2),
    }
  }

  if (testType === 'mock') {
    return {
      weak: Math.floor(totalQuestions * 0.4),
      moderate: Math.floor(totalQuestions * 0.3),
      strong: Math.floor(totalQuestions * 0.3),
    }
  }

  // Default practice test distribution
  return {
    weak: Math.floor(totalQuestions * 0.4),
    moderate: Math.floor(totalQuestions * 0.3),
    strong: Math.floor(totalQuestions * 0.3),
  }
}

/**
 * Generate difficulty progression pattern
 * Starts medium, peaks in middle, ends achievable
 */
function generateDifficultyProgression(totalQuestions: number): string[] {
  const progression: string[] = []

  for (let i = 0; i < totalQuestions; i++) {
    const position = i / totalQuestions

    if (position < 0.2) {
      progression.push('MEDIUM') // Warm-up
    } else if (position < 0.3) {
      progression.push('EASY') // Build confidence
    } else if (position < 0.7) {
      progression.push(i % 2 === 0 ? 'HARD' : 'MEDIUM') // Challenge
    } else {
      progression.push(i % 3 === 0 ? 'MEDIUM' : 'EASY') // Confidence boost
    }
  }

  return progression
}

/**
 * Fetch questions from database based on criteria
 */
async function fetchQuestions(
  topicList: string[],
  difficultyLevel: string,
  count: number,
  excludeIds: string[] = []
) {
  try {
    const whereClause: any = {
      topic: { in: topicList },
      isActive: true,
      id: { notIn: excludeIds },
    }

    if (difficultyLevel !== 'mixed') {
      whereClause.difficulty = difficultyLevel.toUpperCase()
    }

    const questions = await prisma.question.findMany({
      where: whereClause,
      take: count * 2, // Fetch extra for randomization
      orderBy: {
        lastUsed: 'asc', // Prioritize less recently used questions
      },
    })

    // Randomly select from fetched questions
    const shuffled = questions.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  } catch (error) {
    console.error('Error fetching questions:', error)
    return []
  }
}

/**
 * Generate personalized test using Claude AI
 */
async function generateTestPersonalization(
  studentId: string,
  testType: string,
  weakAreas: any[],
  recentPerformance: any[],
  totalQuestions: number
) {
  const weakTopics = weakAreas
    .map((w) => `${w.topic} (${w.accuracy.toFixed(1)}% accuracy)`)
    .join(', ')
  const recentScores = recentPerformance.map((p) => `${p.percentage?.toFixed(1)}%`).join(', ')

  const prompt = `Generate a personalized NEET Biology test for a student with these characteristics:

Student Profile:
- Weak Areas: ${weakTopics || 'Not enough data yet'}
- Recent Performance: ${recentScores || 'First test'}
- Test Type: ${testType}
- Total Questions: ${totalQuestions}

Provide a JSON response with:
1. "title": Engaging and motivational test title
2. "description": Brief description highlighting the focus areas (2-3 sentences)
3. "instructions": Array of 4-5 specific instructions for this student
4. "studyTips": Array of 3 targeted study tips for weak areas

Format as valid JSON only. Be encouraging and specific.`

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
    console.error('AI personalization error:', error)
  }

  // Fallback response
  return {
    title: `${testType.charAt(0).toUpperCase() + testType.slice(1)} Test - NEET Biology`,
    description: `This ${testType} test is designed to assess your understanding and improve your performance in Biology.`,
    instructions: [
      'Read each question carefully before selecting your answer',
      'Manage your time effectively - aim for 1 minute per question',
      'Mark questions for review if you are uncertain',
      'Stay focused on your weak areas to improve overall performance',
    ],
    studyTips:
      weakAreas.length > 0
        ? [
            `Focus on improving ${weakAreas[0]?.topic} - your current accuracy is ${weakAreas[0]?.accuracy.toFixed(1)}%`,
            'Review NCERT chapters for conceptual clarity',
            'Practice more questions in your weak topics',
          ]
        : [
            'Practice regularly to maintain consistency',
            'Review your mistakes thoroughly',
            'Focus on time management',
          ],
  }
}

/**
 * NEET topic distribution for balanced tests
 */
const NEET_TOPIC_CATEGORIES = {
  botany: [
    'Plant Kingdom',
    'Morphology of Flowering Plants',
    'Anatomy of Flowering Plants',
    'Transport in Plants',
    'Mineral Nutrition',
    'Photosynthesis in Higher Plants',
    'Respiration in Plants',
    'Plant Growth and Development',
    'Sexual Reproduction in Flowering Plants',
  ],
  zoology: [
    'Animal Kingdom',
    'Structural Organisation in Animals',
    'Digestion and Absorption',
    'Breathing and Exchange of Gases',
    'Body Fluids and Circulation',
    'Excretory Products and their Elimination',
    'Locomotion and Movement',
    'Neural Control and Coordination',
    'Chemical Coordination and Integration',
    'Human Reproduction',
    'Reproductive Health',
  ],
  commonTopics: [
    'The Living World',
    'Biological Classification',
    'Cell: The Unit of Life',
    'Biomolecules',
    'Cell Cycle and Cell Division',
    'Reproduction in Organisms',
    'Heredity and Variation',
    'Molecular Basis of Inheritance',
    'Evolution',
    'Health and Disease',
    'Microbes in Human Welfare',
    'Biotechnology: Principles and Processes',
    'Biotechnology and its Applications',
    'Organisms and Environment',
    'Ecosystem',
    'Biodiversity and Conservation',
    'Environmental Issues',
  ],
}

/**
 * Get balanced topic distribution for NEET pattern
 */
function getBalancedTopics(preferredTopics: string[] = [], weakAreas: any[] = []): string[] {
  const topics: string[] = []

  // Add weak area topics (40%)
  const weakTopics = weakAreas.map((w) => w.topic).slice(0, 5)
  topics.push(...weakTopics)

  // Add preferred topics
  if (preferredTopics.length > 0) {
    topics.push(...preferredTopics)
  }

  // Ensure botany/zoology balance
  const allTopics = [
    ...NEET_TOPIC_CATEGORIES.botany,
    ...NEET_TOPIC_CATEGORIES.zoology,
    ...NEET_TOPIC_CATEGORIES.commonTopics,
  ]

  // Add random topics to reach diversity
  const remainingTopics = allTopics.filter((t) => !topics.includes(t))
  const randomTopics = remainingTopics.sort(() => 0.5 - Math.random()).slice(0, 5)
  topics.push(...randomTopics)

  return Array.from(new Set(topics)) // Remove duplicates
}

// Main API Handler
export async function POST(request: NextRequest) {
  try {
    const body: TestGenerationRequest = await request.json()
    const { studentId, testType, config = {} } = body

    // Validate required fields
    if (!studentId || !testType) {
      return NextResponse.json(
        { error: 'Missing required fields: studentId and testType' },
        { status: 400 }
      )
    }

    // Set defaults
    const totalQuestions = config.totalQuestions || 50
    const duration = config.duration || 60 // minutes
    const difficulty = config.difficulty || 'mixed'
    const examPattern = config.examPattern || 'neet'
    const includeWeakAreas = config.includeWeakAreas !== false

    console.log(`🧪 Generating ${testType} test for student ${studentId}`)

    // Fetch student data
    const [weakAreas, recentPerformance] = await Promise.all([
      includeWeakAreas ? getStudentWeakAreas(studentId) : Promise.resolve([]),
      getStudentPerformance(studentId),
    ])

    console.log(`📊 Weak areas: ${weakAreas.length}, Recent tests: ${recentPerformance.length}`)

    // Calculate question distribution
    const distribution = calculateQuestionDistribution(totalQuestions, weakAreas, testType)

    // Get topic list
    const topicList =
      config.topics && config.topics.length > 0
        ? config.topics
        : getBalancedTopics(config.topics, weakAreas)

    console.log(`📚 Topics selected: ${topicList.length}`)

    // Fetch questions based on distribution
    const selectedQuestions: any[] = []
    const usedIds: string[] = []

    // Weak area questions (40%)
    if (distribution.weak > 0 && weakAreas.length > 0) {
      const weakTopics = weakAreas.map((w) => w.topic).slice(0, 3)
      const weakQuestions = await fetchQuestions(weakTopics, 'mixed', distribution.weak, usedIds)
      selectedQuestions.push(...weakQuestions)
      usedIds.push(...weakQuestions.map((q) => q.id))
    }

    // Moderate area questions (30%)
    if (distribution.moderate > 0) {
      const moderateQuestions = await fetchQuestions(
        topicList,
        'MEDIUM',
        distribution.moderate,
        usedIds
      )
      selectedQuestions.push(...moderateQuestions)
      usedIds.push(...moderateQuestions.map((q) => q.id))
    }

    // Strong area questions (30%)
    if (distribution.strong > 0) {
      const strongQuestions = await fetchQuestions(topicList, 'EASY', distribution.strong, usedIds)
      selectedQuestions.push(...strongQuestions)
      usedIds.push(...strongQuestions.map((q) => q.id))
    }

    // Fill any gaps with random questions
    if (selectedQuestions.length < totalQuestions) {
      const remaining = totalQuestions - selectedQuestions.length
      const fillQuestions = await fetchQuestions(topicList, 'mixed', remaining, usedIds)
      selectedQuestions.push(...fillQuestions)
    }

    // Limit to exact count
    const finalQuestions = selectedQuestions.slice(0, totalQuestions)

    // Apply difficulty progression
    const progression = generateDifficultyProgression(finalQuestions.length)
    const sortedQuestions = finalQuestions.sort((a, b) => {
      const aIndex = finalQuestions.indexOf(a)
      const bIndex = finalQuestions.indexOf(b)
      const aTargetDiff = progression[aIndex]
      const bTargetDiff = progression[bIndex]

      if (a.difficulty === aTargetDiff && b.difficulty !== bTargetDiff) return -1
      if (a.difficulty !== aTargetDiff && b.difficulty === bTargetDiff) return 1
      return 0
    })

    // Generate AI personalization
    const personalization = await generateTestPersonalization(
      studentId,
      testType,
      weakAreas,
      recentPerformance,
      totalQuestions
    )

    // Format questions for response
    const formattedQuestions: Question[] = sortedQuestions.map((q) => ({
      id: q.id,
      question: q.question,
      options: Array.isArray(q.options) ? q.options : JSON.parse((q.options as string) || '[]'),
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || undefined,
      topic: q.topic,
      subtopic: q.subtopic || undefined,
      difficulty: q.difficulty,
      marks: q.marks,
      timeLimit: q.timeLimit || undefined,
    }))

    // Create test session in database
    const testSession = await prisma.testSession.create({
      data: {
        userId: body.studentId.startsWith('user_') ? body.studentId : undefined,
        freeUserId: body.studentId.startsWith('free_') ? body.studentId : undefined,
        testTemplateId: 'ai-generated-' + Date.now(),
        sessionToken: `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'NOT_STARTED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    // Prepare response
    const response: TestGenerationResponse = {
      testId: testSession.id,
      title: personalization.title,
      description: personalization.description,
      questions: formattedQuestions,
      metadata: {
        totalQuestions: formattedQuestions.length,
        totalMarks: formattedQuestions.reduce((sum, q) => sum + q.marks, 0),
        duration,
        difficulty,
        topics: Array.from(new Set(formattedQuestions.map((q) => q.topic))),
        weakAreasTargeted: weakAreas.map((w) => w.topic),
      },
      instructions: personalization.instructions,
      createdAt: new Date().toISOString(),
    }

    console.log(`✅ Test generated successfully: ${response.testId}`)

    return NextResponse.json(response)
  } catch (error) {
    console.error('❌ Test generation error:', error)

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(
      { error: 'Failed to generate test. Please try again.' },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'AI Test Generator',
    model: 'claude-sonnet-4-20250514',
    capabilities: [
      'Personalized test generation',
      'Weak area targeting',
      'NEET exam pattern optimization',
      'Difficulty progression',
      'Topic balancing',
      'AI-powered personalization',
    ],
    timestamp: new Date().toISOString(),
  })
}
