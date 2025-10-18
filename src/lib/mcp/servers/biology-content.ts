/**
 * Biology Content MCP Server
 * Provides Claude with access to NEET biology questions, study materials, and NCERT content
 * Connected to PostgreSQL database via Prisma ORM
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { PrismaClient } from '@/generated/prisma'

// Initialize Prisma client with connection pooling and timeout settings
const db = new PrismaClient({
  log: ['error', 'warn'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

// Set query timeout to 5 seconds
const QUERY_TIMEOUT = 5000

// Helper function to execute queries with timeout
async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Query timeout exceeded')), timeoutMs)
  )
  return Promise.race([promise, timeout])
}

// Database health check
async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await db.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}

// Legacy interface for backward compatibility
interface BiologyQuestion {
  id: string
  topic: string
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  ncertReference?: string
}

// Helper function to generate personalized recommendations
function generateRecommendation(topic: string, accuracy: number, improvementRate: number): string {
  if (accuracy < 30) {
    return `${topic} needs immediate attention. Start with NCERT basics, focus on fundamental concepts, and practice easy-level questions daily.`
  } else if (accuracy < 50) {
    return `${topic} requires focused revision. Review NCERT thoroughly, practice medium-level questions, and identify specific weak subtopics.`
  } else if (accuracy < 60) {
    return `${topic} needs consistent practice. Solve more medium and hard questions, focus on application-based problems, and review mistakes carefully.`
  } else if (improvementRate < 0) {
    return `${topic} performance is declining. Take a diagnostic test, review recent mistakes, and reinforce fundamental concepts.`
  } else {
    return `${topic} is almost at target. Practice previous year questions, focus on time management, and work on advanced problem-solving.`
  }
}

// Helper function to determine urgency level
function getUrgencyLevel(accuracy: number, lastPracticed: Date | null): string {
  const daysSinceLastPractice = lastPracticed
    ? Math.floor((Date.now() - lastPracticed.getTime()) / (1000 * 60 * 60 * 24))
    : 999

  if (accuracy < 30 || daysSinceLastPractice > 14) {
    return 'CRITICAL'
  } else if (accuracy < 50 || daysSinceLastPractice > 7) {
    return 'HIGH'
  } else if (accuracy < 60 || daysSinceLastPractice > 3) {
    return 'MEDIUM'
  } else {
    return 'LOW'
  }
}

// Helper function to generate action plan
function generateActionPlan(weakAreas: any[]): string[] {
  const actionPlan: string[] = []

  // Sort by urgency
  const critical = weakAreas.filter((area) => area.urgencyLevel === 'CRITICAL')
  const high = weakAreas.filter((area) => area.urgencyLevel === 'HIGH')

  if (critical.length > 0) {
    actionPlan.push(
      `URGENT: Address ${critical.length} critical topic(s): ${critical.map((a) => a.topic).join(', ')}. Start immediately with NCERT revision.`
    )
  }

  if (high.length > 0) {
    actionPlan.push(
      `HIGH PRIORITY: Work on ${high.length} topic(s): ${high.map((a) => a.topic).join(', ')}. Dedicate 2-3 hours daily to these topics.`
    )
  }

  actionPlan.push(
    'Create a study schedule focusing on weak areas first, then maintaining strong areas.'
  )
  actionPlan.push('Take weekly mock tests to track improvement and identify new weak areas early.')
  actionPlan.push(
    'Review all incorrect answers thoroughly and maintain an error journal for revision.'
  )

  return actionPlan
}

const server = new Server(
  {
    name: 'cerebrum-biology-content',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
)

// TOOL 1: Query Biology Questions
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'query_biology_questions',
        description: 'Search and retrieve NEET biology questions by topic, difficulty, or keywords',
        inputSchema: {
          type: 'object',
          properties: {
            topic: {
              type: 'string',
              description: 'Biology topic (e.g., "Cell Biology", "Genetics", "Ecology")',
            },
            difficulty: {
              type: 'string',
              enum: ['easy', 'medium', 'hard'],
              description: 'Question difficulty level',
            },
            keywords: {
              type: 'string',
              description: 'Keywords to search for in questions',
            },
            limit: {
              type: 'number',
              description: 'Maximum number of questions to return',
              default: 10,
            },
          },
        },
      },
      {
        name: 'get_ncert_content',
        description: 'Retrieve NCERT textbook content for a specific chapter or topic',
        inputSchema: {
          type: 'object',
          properties: {
            class: {
              type: 'number',
              enum: [11, 12],
              description: 'NCERT class (11 or 12)',
            },
            chapter: {
              type: 'string',
              description: 'Chapter name or number',
            },
            section: {
              type: 'string',
              description: 'Specific section within chapter (optional)',
            },
          },
          required: ['class', 'chapter'],
        },
      },
      {
        name: 'get_student_weak_areas',
        description: 'Get topics where student is performing poorly',
        inputSchema: {
          type: 'object',
          properties: {
            studentId: {
              type: 'string',
              description: 'Student ID',
            },
            threshold: {
              type: 'number',
              description: 'Accuracy threshold below which topic is considered weak',
              default: 60,
            },
          },
          required: ['studentId'],
        },
      },
    ],
  }
})

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  switch (name) {
    case 'query_biology_questions': {
      const {
        topic,
        difficulty,
        keywords,
        limit = 10,
      } = args as {
        topic?: string
        difficulty?: string
        keywords?: string
        limit?: number
      }

      try {
        // Ensure limit doesn't exceed 100 questions for performance
        const safeLimit = Math.min(limit || 10, 100)

        // Build the where clause dynamically
        const whereClause: any = {
          isActive: true, // Only return active questions
        }

        if (topic) {
          whereClause.topic = {
            contains: topic,
            mode: 'insensitive',
          }
        }

        if (difficulty) {
          // Map user input to enum values (EASY, MEDIUM, HARD)
          const difficultyMap: Record<string, string> = {
            easy: 'EASY',
            medium: 'MEDIUM',
            hard: 'HARD',
            expert: 'EXPERT',
          }
          const mappedDifficulty = difficultyMap[difficulty.toLowerCase()]
          if (mappedDifficulty) {
            whereClause.difficulty = mappedDifficulty
          }
        }

        if (keywords) {
          whereClause.question = {
            contains: keywords,
            mode: 'insensitive',
          }
        }

        // Execute query with timeout
        const questions = await withTimeout(
          db.question.findMany({
            where: whereClause,
            take: safeLimit,
            orderBy: {
              popularityScore: 'desc', // Return most popular questions first
            },
            select: {
              id: true,
              topic: true,
              subtopic: true,
              difficulty: true,
              question: true,
              options: true,
              correctAnswer: true,
              explanation: true,
              solutionSteps: true,
              questionImage: true,
              explanationImage: true,
              videoExplanation: true,
              source: true,
              examYear: true,
              marks: true,
              timeLimit: true,
              tags: true,
              relatedConcepts: true,
              totalAttempts: true,
              correctAttempts: true,
              averageTime: true,
            },
          }),
          QUERY_TIMEOUT
        )

        // Format questions for response
        const formattedQuestions = questions.map((q) => ({
          id: q.id,
          topic: q.topic,
          subtopic: q.subtopic || undefined,
          difficulty: q.difficulty.toLowerCase(),
          question: q.question,
          options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || undefined,
          solutionSteps:
            typeof q.solutionSteps === 'string' ? JSON.parse(q.solutionSteps) : q.solutionSteps,
          questionImage: q.questionImage || undefined,
          explanationImage: q.explanationImage || undefined,
          videoExplanation: q.videoExplanation || undefined,
          source: q.source || undefined,
          examYear: q.examYear || undefined,
          marks: q.marks,
          timeLimit: q.timeLimit || undefined,
          tags: typeof q.tags === 'string' ? JSON.parse(q.tags) : q.tags,
          relatedConcepts:
            typeof q.relatedConcepts === 'string'
              ? JSON.parse(q.relatedConcepts)
              : q.relatedConcepts,
          accuracy:
            q.totalAttempts && q.totalAttempts > 0
              ? ((q.correctAttempts || 0) / q.totalAttempts) * 100
              : undefined,
          averageTime: q.averageTime || undefined,
        }))

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  success: true,
                  count: formattedQuestions.length,
                  questions: formattedQuestions,
                  filters: {
                    topic: topic || 'all',
                    difficulty: difficulty || 'all',
                    keywords: keywords || 'none',
                  },
                },
                null,
                2
              ),
            },
          ],
        }
      } catch (error) {
        console.error('Error querying biology questions:', error)

        // Fallback to mock data on error
        const mockQuestions: BiologyQuestion[] = [
          {
            id: 'MOCK_001',
            topic: topic || 'Cell Biology',
            difficulty: (difficulty as any) || 'medium',
            question: 'What is the powerhouse of the cell?',
            options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Body'],
            correctAnswer: 1,
            explanation:
              'Mitochondria are called the powerhouse of the cell because they produce ATP through cellular respiration.',
            ncertReference: 'Class 11, Chapter 8: Cell - The Unit of Life',
          },
        ]

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  success: false,
                  error: 'Database query failed, returning mock data',
                  errorDetails: error instanceof Error ? error.message : 'Unknown error',
                  count: mockQuestions.length,
                  questions: mockQuestions,
                  warning: 'Please check database connection and seed data',
                },
                null,
                2
              ),
            },
          ],
        }
      }
    }

    case 'get_ncert_content': {
      const {
        class: className,
        chapter,
        section,
      } = args as {
        class: number
        chapter: string
        section?: string
      }

      try {
        // Map class number to grade enum
        const gradeMap: Record<number, string> = {
          9: 'CLASS_9',
          10: 'CLASS_10',
          11: 'CLASS_11',
          12: 'CLASS_12',
        }
        const grade = gradeMap[className]

        if (!grade) {
          throw new Error(`Invalid class number: ${className}. Must be 9, 10, 11, or 12.`)
        }

        // Build search query for chapter notes
        const whereClause: any = {
          grade,
          chapter: {
            contains: chapter,
            mode: 'insensitive',
          },
          subject: 'Biology',
          isPublished: true,
        }

        if (section) {
          whereClause.topic = {
            contains: section,
            mode: 'insensitive',
          }
        }

        // Query ChapterNote table for NCERT-like content
        const ncertContent = await withTimeout(
          db.chapterNote.findFirst({
            where: whereClause,
            orderBy: {
              viewCount: 'desc', // Prefer most viewed content
            },
            select: {
              id: true,
              title: true,
              chapter: true,
              topic: true,
              content: true,
              summary: true,
              keyPoints: true,
              diagrams: true,
              difficulty: true,
              estimatedTime: true,
              tags: true,
              viewCount: true,
              rating: true,
              ratingCount: true,
            },
          }),
          QUERY_TIMEOUT
        )

        if (ncertContent) {
          // Format the content response
          const formattedContent = {
            success: true,
            class: className,
            grade,
            chapter: ncertContent.chapter,
            section: ncertContent.topic || section || 'Full Chapter',
            title: ncertContent.title,
            content: ncertContent.content,
            summary: ncertContent.summary || undefined,
            keyPoints:
              typeof ncertContent.keyPoints === 'string'
                ? JSON.parse(ncertContent.keyPoints)
                : ncertContent.keyPoints,
            diagrams:
              typeof ncertContent.diagrams === 'string'
                ? JSON.parse(ncertContent.diagrams)
                : ncertContent.diagrams,
            difficulty: ncertContent.difficulty,
            estimatedReadingTime: ncertContent.estimatedTime
              ? `${ncertContent.estimatedTime} minutes`
              : undefined,
            tags:
              typeof ncertContent.tags === 'string'
                ? JSON.parse(ncertContent.tags)
                : ncertContent.tags,
            popularity: {
              views: ncertContent.viewCount,
              rating: ncertContent.rating,
              totalRatings: ncertContent.ratingCount,
            },
          }

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(formattedContent, null, 2),
              },
            ],
          }
        } else {
          // No content found in database, return informative response
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    success: false,
                    class: className,
                    grade,
                    chapter,
                    section: section || 'Full Chapter',
                    error: 'No NCERT content found for this chapter',
                    suggestion:
                      'The chapter notes may not have been added to the database yet. Please check the chapter name spelling or try a different chapter.',
                    availableAlternatives: 'You can query biology questions on this topic instead.',
                  },
                  null,
                  2
                ),
              },
            ],
          }
        }
      } catch (error) {
        console.error('Error retrieving NCERT content:', error)

        // Fallback to mock data on error
        const mockContent = {
          success: false,
          error: 'Database query failed',
          errorDetails: error instanceof Error ? error.message : 'Unknown error',
          class: className,
          chapter,
          section: section || 'Full Chapter',
          content: `Mock NCERT content for Class ${className} - Chapter: ${chapter}

This is fallback content. Database connection failed.

In production, this would:
1. Load from ChapterNote table
2. Include markdown formatted content
3. Provide diagrams and illustrations
4. Include key points and summary

Topics covered:
- Introduction to ${chapter}
- Key concepts and definitions
- Detailed explanations
- Examples and applications
- Practice questions`,
          warning: 'Please check database connection and ensure chapter notes are seeded',
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(mockContent, null, 2),
            },
          ],
        }
      }
    }

    case 'get_student_weak_areas': {
      const { studentId, threshold = 60 } = args as {
        studentId: string
        threshold?: number
      }

      try {
        // Query UserProgress table for weak areas
        // First try to find as regular user, then as free user
        const studentProgress = await withTimeout(
          db.userProgress.findMany({
            where: {
              OR: [{ userId: studentId }, { freeUserId: studentId }],
              accuracy: {
                lt: threshold, // Less than threshold
              },
            },
            orderBy: {
              accuracy: 'asc', // Weakest areas first
            },
            take: 10, // Return top 10 weak areas
            select: {
              topic: true,
              subtopic: true,
              accuracy: true,
              totalQuestions: true,
              correctAnswers: true,
              averageTime: true,
              improvementRate: true,
              currentLevel: true,
              masteryScore: true,
              weakAreas: true,
              recommendedNext: true,
              lastPracticed: true,
              curriculum: true,
              grade: true,
            },
          }),
          QUERY_TIMEOUT
        )

        if (studentProgress.length > 0) {
          // Format weak areas with detailed recommendations
          const weakAreas = studentProgress.map((progress) => ({
            topic: progress.topic,
            subtopic: progress.subtopic || undefined,
            accuracy: Math.round(progress.accuracy * 10) / 10, // Round to 1 decimal
            questionsAttempted: progress.totalQuestions,
            correctAnswers: progress.correctAnswers,
            averageTime: progress.averageTime
              ? `${Math.round(progress.averageTime)} seconds`
              : undefined,
            improvementRate: progress.improvementRate
              ? `${progress.improvementRate > 0 ? '+' : ''}${Math.round(progress.improvementRate * 10) / 10}%`
              : undefined,
            currentLevel: progress.currentLevel.toLowerCase(),
            masteryScore: Math.round(progress.masteryScore * 10) / 10,
            lastPracticed: progress.lastPracticed
              ? progress.lastPracticed.toISOString().split('T')[0]
              : 'Never',
            weakAreas:
              typeof progress.weakAreas === 'string'
                ? JSON.parse(progress.weakAreas)
                : progress.weakAreas,
            recommendedNext:
              typeof progress.recommendedNext === 'string'
                ? JSON.parse(progress.recommendedNext)
                : progress.recommendedNext,
            recommendation: generateRecommendation(
              progress.topic,
              progress.accuracy,
              progress.improvementRate || 0
            ),
            urgencyLevel: getUrgencyLevel(progress.accuracy, progress.lastPracticed),
          }))

          // Get recent test performance for additional context
          const recentTests = await withTimeout(
            db.testSession.findMany({
              where: {
                OR: [{ userId: studentId }, { freeUserId: studentId }],
                status: 'COMPLETED',
              },
              orderBy: {
                submittedAt: 'desc',
              },
              take: 5,
              select: {
                testTemplate: {
                  select: {
                    title: true,
                    topics: true,
                  },
                },
                totalScore: true,
                percentage: true,
                submittedAt: true,
                timeSpent: true,
              },
            }),
            QUERY_TIMEOUT
          )

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    success: true,
                    studentId,
                    threshold,
                    totalWeakAreas: weakAreas.length,
                    weakAreas,
                    recentTestPerformance: recentTests.map((test) => ({
                      title: test.testTemplate?.title || 'Unknown Test',
                      topics:
                        typeof test.testTemplate?.topics === 'string'
                          ? JSON.parse(test.testTemplate.topics)
                          : test.testTemplate?.topics,
                      score: test.totalScore,
                      percentage: test.percentage
                        ? Math.round(test.percentage * 10) / 10
                        : undefined,
                      date: test.submittedAt
                        ? test.submittedAt.toISOString().split('T')[0]
                        : undefined,
                      timeSpent: test.timeSpent
                        ? `${Math.round(test.timeSpent / 60)} minutes`
                        : undefined,
                    })),
                    overallInsights: {
                      criticalAreas: weakAreas.filter((area) => area.accuracy < 40).length,
                      needsAttention: weakAreas.filter(
                        (area) => area.accuracy >= 40 && area.accuracy < threshold
                      ).length,
                      improvement: weakAreas.filter(
                        (area) => area.improvementRate && parseFloat(area.improvementRate) > 0
                      ).length,
                    },
                    actionPlan: generateActionPlan(weakAreas),
                  },
                  null,
                  2
                ),
              },
            ],
          }
        } else {
          // No weak areas found - either student is doing well or has no data
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    success: true,
                    studentId,
                    threshold,
                    totalWeakAreas: 0,
                    weakAreas: [],
                    message:
                      'No weak areas found! Either the student is performing well across all topics, or there is insufficient practice data.',
                    suggestion:
                      'If this is a new student, they should complete some practice tests to generate performance data.',
                  },
                  null,
                  2
                ),
              },
            ],
          }
        }
      } catch (error) {
        console.error('Error retrieving student weak areas:', error)

        // Fallback to mock data on error
        const mockWeakAreas = [
          {
            topic: 'Genetics',
            accuracy: 45,
            questionsAttempted: 50,
            lastPracticed: '2025-01-15',
            recommendation: 'Focus on Mendelian genetics and pedigree analysis',
          },
          {
            topic: 'Ecology',
            accuracy: 52,
            questionsAttempted: 30,
            lastPracticed: '2025-01-14',
            recommendation: 'Review ecosystem dynamics and food chains',
          },
        ]

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  success: false,
                  error: 'Database query failed, returning mock data',
                  errorDetails: error instanceof Error ? error.message : 'Unknown error',
                  studentId,
                  threshold,
                  weakAreas: mockWeakAreas,
                  warning: 'Please check database connection and ensure student data exists',
                },
                null,
                2
              ),
            },
          ],
        }
      }
    }

    default:
      throw new Error(`Unknown tool: ${name}`)
  }
})

// RESOURCES: NCERT Textbooks, Study Materials
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'ncert://class11/cell-biology',
        name: 'NCERT Class 11 - Cell Biology',
        mimeType: 'text/plain',
        description: 'Complete NCERT chapter on Cell: The Unit of Life',
      },
      {
        uri: 'ncert://class12/genetics',
        name: 'NCERT Class 12 - Genetics and Evolution',
        mimeType: 'text/plain',
        description: 'NCERT chapters on Genetics and Evolution',
      },
      {
        uri: 'materials://neet-previous-years',
        name: 'NEET Previous Year Questions',
        mimeType: 'application/json',
        description: 'Collection of NEET biology questions from past 10 years',
      },
    ],
  }
})

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params

  if (uri.startsWith('ncert://')) {
    // Parse URI: ncert://class11/cell-biology
    const [, classNum, topic] = uri.split('/')

    return {
      contents: [
        {
          uri,
          mimeType: 'text/plain',
          text: `NCERT ${classNum.toUpperCase()} - ${topic.replace('-', ' ').toUpperCase()}

This is mock content. In production, this would:
1. Load actual NCERT PDF from Vercel Blob Storage
2. Extract and parse the content
3. Return formatted text with diagrams

Sample structure:
- Chapter overview
- Learning objectives
- Detailed content
- Diagrams and illustrations
- Summary
- Practice questions`,
        },
      ],
    }
  }

  if (uri.startsWith('materials://')) {
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify({
            type: 'study-materials',
            content: 'Previous year NEET questions and solutions',
            count: 5000,
            years: '2015-2024',
          }),
        },
      ],
    }
  }

  throw new Error(`Unknown resource: ${uri}`)
})

// Start server
async function main() {
  try {
    // Check database connection on startup
    console.error('Checking database connection...')
    const dbConnected = await checkDatabaseConnection()

    if (dbConnected) {
      console.error('✓ Database connection successful')
    } else {
      console.error('⚠ Database connection failed - server will use fallback mock data')
    }

    // Connect to transport
    const transport = new StdioServerTransport()
    await server.connect(transport)

    console.error('✓ Cerebrum Biology Content MCP Server running on stdio')
    console.error(
      '✓ Available tools: query_biology_questions, get_ncert_content, get_student_weak_areas'
    )
    console.error('✓ Query timeout: 5 seconds')
    console.error('✓ Max questions per query: 100')
  } catch (error) {
    console.error('❌ Failed to start MCP server:', error)
    throw error
  }
}

// Graceful shutdown
async function shutdown() {
  console.error('Shutting down MCP server...')
  try {
    await db.$disconnect()
    console.error('✓ Database connection closed')
  } catch (error) {
    console.error('Error disconnecting from database:', error)
  }
  process.exit(0)
}

// Handle process termination signals
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error)
  shutdown()
})
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason)
  shutdown()
})

main().catch((error) => {
  console.error('❌ Server error:', error)
  process.exit(1)
})
