import { prisma, DatabaseUtils } from './connection'
import {
  TestTemplateCacheService,
  TestSessionCacheService,
  AnalyticsCacheService,
} from '../cache/redis'
import type {
  test_templates,
  test_sessions,
  test_attempts,
  questions,
  user_question_responses,
  test_analytics,
  Prisma,
} from '@/generated/prisma'

export interface CreateTestTemplateInput {
  title: string
  description?: string
  slug: string
  type: string
  category: string
  difficulty: string
  timeLimit: number
  totalQuestions: number
  totalMarks: number
  passingMarks?: number
  curriculum: string
  grade: string
  subject: string
  topics: string[]
  negativeMarking?: boolean
  markingScheme?: Record<string, any>
  questionDistribution?: Record<string, any>
  instructions?: string[]
  isAdaptive?: boolean
  adaptiveSettings?: Record<string, any>
  isPremium?: boolean
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  createdBy?: string
}

export interface StartTestSessionInput {
  userId?: string
  freeUserId?: string
  testTemplateId: string
  browserInfo?: Record<string, any>
  ipAddress?: string
  locationData?: Record<string, any>
}

export interface SubmitAnswerInput {
  sessionToken: string
  questionId: string
  selectedAnswer: string
  timeSpent: number
  isMarkedForReview?: boolean
  confidence?: number
}

export interface TestFilters {
  type?: string
  category?: string
  difficulty?: string
  subject?: string
  curriculum?: string
  grade?: string
  isPremium?: boolean
  isActive?: boolean
  search?: string
}

export class TestService {
  // Test Template Management
  static async createTestTemplate(data: CreateTestTemplateInput): Promise<test_templates> {
    try {
      const template = await prisma.test_templates.create({
        data: {
          title: data.title,
          description: data.description,
          slug: data.slug,
          type: data.type as any,
          category: data.category as any,
          difficulty: data.difficulty as any,
          timeLimit: data.timeLimit,
          totalQuestions: data.totalQuestions,
          totalMarks: data.totalMarks,
          passingMarks: data.passingMarks,
          curriculum: data.curriculum,
          grade: data.grade,
          subject: data.subject,
          topics: JSON.stringify(data.topics),
          negativeMarking: data.negativeMarking ?? false,
          markingScheme: data.markingScheme ? JSON.stringify(data.markingScheme) : null,
          questionDistribution: data.questionDistribution
            ? JSON.stringify(data.questionDistribution)
            : null,
          instructions: data.instructions ? JSON.stringify(data.instructions) : null,
          isAdaptive: data.isAdaptive ?? false,
          adaptiveSettings: data.adaptiveSettings ? JSON.stringify(data.adaptiveSettings) : null,
          isPremium: data.isPremium ?? false,
          seoTitle: data.seoTitle,
          seoDescription: data.seoDescription,
          seoKeywords: data.seoKeywords ? JSON.stringify(data.seoKeywords) : null,
          isActive: true,
          isPublished: false,
          createdBy: data.createdBy,
        } as any,
      })

      // Cache the new template
      await TestTemplateCacheService.cacheTestTemplate(template)

      return template
    } catch (error) {
      console.error('Failed to create test template:', error)
      throw new Error('Failed to create test template')
    }
  }

  static async getTestTemplateById(id: string): Promise<test_templates | null> {
    try {
      // Try cache first
      const cached = await TestTemplateCacheService.getTestTemplate(id)
      if (cached) {
        return cached
      }

      // OPTIMIZED: Single query with eager loading to prevent N+1
      const template = await prisma.test_templates.findUnique({
        where: { id },
        include: {
          question_bank_questions: {
            include: {
              questions: {
                // Select only necessary fields to reduce data transfer
                select: {
                  id: true,
                  topic: true,
                  difficulty: true,
                  question: true,
                  options: true,
                  correctAnswer: true,
                  explanation: true,
                  marks: true,
                  timeLimit: true,
                  questionImage: true,
                  type: true,
                },
              },
            },
          },
        },
      })

      if (template) {
        await TestTemplateCacheService.cacheTestTemplate(template)
      }

      return template
    } catch (error) {
      console.error('Failed to fetch test template:', error)
      return null
    }
  }

  static async getTestTemplateBySlug(slug: string): Promise<test_templates | null> {
    try {
      // Try cache first
      const cached = await TestTemplateCacheService.getTestTemplateBySlug(slug)
      if (cached) {
        return cached
      }

      // OPTIMIZED: Single query with eager loading to prevent N+1
      const template = await prisma.test_templates.findUnique({
        where: { slug },
        include: {
          question_bank_questions: {
            include: {
              questions: {
                // Select only necessary fields to reduce data transfer
                select: {
                  id: true,
                  topic: true,
                  difficulty: true,
                  question: true,
                  options: true,
                  correctAnswer: true,
                  explanation: true,
                  marks: true,
                  timeLimit: true,
                  questionImage: true,
                  type: true,
                },
              },
            },
          },
        },
      })

      if (template) {
        await TestTemplateCacheService.cacheTestTemplate(template)
      }

      return template
    } catch (error) {
      console.error('Failed to fetch test template by slug:', error)
      return null
    }
  }

  static async getTestTemplates(
    filters: TestFilters = {},
    page: number = 1,
    limit: number = 20
  ): Promise<{ templates: test_templates[]; total: number; hasMore: boolean }> {
    try {
      // Try cache first
      const cached = await TestTemplateCacheService.getTestTemplatesList(filters)
      if (cached) {
        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginatedTemplates = cached.slice(startIndex, endIndex)

        return {
          templates: paginatedTemplates,
          total: cached.length,
          hasMore: endIndex < cached.length,
        }
      }

      // Build where clause
      const where: Prisma.test_templatesWhereInput = {
        isActive: filters.isActive ?? true,
        isPublished: true,
      }

      if (filters.type) where.type = filters.type as any
      if (filters.category) where.category = filters.category as any
      if (filters.difficulty) where.difficulty = filters.difficulty as any
      if (filters.subject) where.subject = filters.subject
      if (filters.curriculum) where.curriculum = filters.curriculum
      if (filters.grade) where.grade = filters.grade
      if (filters.isPremium !== undefined) where.isPremium = filters.isPremium

      if (filters.search) {
        where.OR = [
          { title: { contains: filters.search, mode: 'insensitive' } },
          { description: { contains: filters.search, mode: 'insensitive' } },
        ]
      }

      // Get paginated results
      const [templates, total] = await Promise.all([
        prisma.test_templates.findMany({
          where,
          orderBy: [{ popularityScore: 'desc' }, { createdAt: 'desc' }],
          ...DatabaseUtils.getPaginationParams(page, limit),
        }),
        prisma.test_templates.count({ where }),
      ])

      // Cache the results
      await TestTemplateCacheService.cacheTestTemplatesList(templates, filters)

      return {
        templates,
        total,
        hasMore: page * limit < total,
      }
    } catch (error) {
      console.error('Failed to fetch test templates:', error)
      return { templates: [], total: 0, hasMore: false }
    }
  }

  static async getPopularTests(limit: number = 10): Promise<test_templates[]> {
    try {
      // Try cache first
      const cached = await TestTemplateCacheService.getPopularTests()
      if (cached) {
        return cached.slice(0, limit)
      }

      const templates = await prisma.test_templates.findMany({
        where: {
          isActive: true,
          isPublished: true,
        },
        orderBy: [{ attemptCount: 'desc' }, { popularityScore: 'desc' }],
        take: limit,
      })

      await TestTemplateCacheService.cachePopularTests(templates)

      return templates
    } catch (error) {
      console.error('Failed to fetch popular tests:', error)
      return []
    }
  }

  // Test Session Management
  static async startTestSession(data: StartTestSessionInput): Promise<test_sessions | null> {
    try {
      // Check if user has an active session
      const userId = data.userId || data.freeUserId || ''
      const existingSession = await TestSessionCacheService.getUserActiveSession(userId)

      if (existingSession) {
        const session = await TestSessionCacheService.getTestSession(existingSession)
        if (session && ['IN_PROGRESS', 'PAUSED'].includes(session.status)) {
          throw new Error('You already have an active test session')
        }
      }

      // Generate unique session token
      const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      const session = await prisma.test_sessions.create({
        data: {
          userId: data.userId,
          freeUserId: data.freeUserId,
          testTemplateId: data.testTemplateId,
          sessionToken,
          status: 'NOT_STARTED',
          browserInfo: data.browserInfo ? JSON.stringify(data.browserInfo) : null,
          ipAddress: data.ipAddress,
          locationData: data.locationData ? JSON.stringify(data.locationData) : null,
        } as any,
      })

      // Cache the session
      await TestSessionCacheService.cacheTestSession(session)

      // Track in analytics
      await AnalyticsCacheService.addActiveTest(sessionToken)

      return session
    } catch (error) {
      console.error('Failed to start test session:', error)
      return null
    }
  }

  static async getTestSession(sessionToken: string): Promise<test_sessions | null> {
    try {
      // Try cache first
      const cached = await TestSessionCacheService.getTestSession(sessionToken)
      if (cached) {
        return cached
      }

      // OPTIMIZED: Single query with eager loading to prevent N+1
      // This prevents separate queries for each response's question
      const session = await prisma.test_sessions.findUnique({
        where: { sessionToken },
        include: {
          test_templates: true,
          user_question_responses: {
            include: {
              questions: {
                // Select only necessary fields to reduce data transfer
                select: {
                  id: true,
                  topic: true,
                  difficulty: true,
                  question: true,
                  options: true,
                  correctAnswer: true,
                  explanation: true,
                  marks: true,
                  type: true,
                },
              },
            },
            orderBy: {
              answeredAt: 'asc',
            },
          },
        },
      })

      if (session) {
        await TestSessionCacheService.cacheTestSession(session)
      }

      return session
    } catch (error) {
      console.error('Failed to fetch test session:', error)
      return null
    }
  }

  static async updateTestSession(
    sessionToken: string,
    updates: Partial<test_sessions>
  ): Promise<test_sessions | null> {
    try {
      const session = await prisma.test_sessions.update({
        where: { sessionToken },
        data: {
          ...updates,
          updatedAt: new Date(),
        },
      })

      // Update cache
      await TestSessionCacheService.cacheTestSession(session)

      return session
    } catch (error) {
      console.error('Failed to update test session:', error)
      return null
    }
  }

  static async submitAnswer(data: SubmitAnswerInput): Promise<user_question_responses | null> {
    try {
      // Get the test session
      const session = await this.getTestSession(data.sessionToken)
      if (!session) {
        throw new Error('Test session not found')
      }

      // Get the question to check correct answer
      const question = await prisma.questions.findUnique({
        where: { id: data.questionId },
      })

      if (!question) {
        throw new Error('Question not found')
      }

      const isCorrect = question.correctAnswer === data.selectedAnswer

      // Create the response
      const response = await prisma.user_question_responses.create({
        data: {
          userId: session.userId,
          freeUserId: session.freeUserId,
          questionId: data.questionId,
          testSessionId: session.id,
          selectedAnswer: data.selectedAnswer,
          isCorrect,
          timeSpent: data.timeSpent,
          confidence: data.confidence,
          responseMode: 'TEST_MODE',
          marksAwarded: isCorrect ? question.marks : 0,
        } as any,
      })

      // Update session progress
      await this.updateTestSession(data.sessionToken, {
        questionsAnswered: session.questionsAnswered + 1,
        timeSpent: session.timeSpent + data.timeSpent,
      })

      // Cache the answer for real-time auto-save
      const currentAnswers =
        (await TestSessionCacheService.getSessionAnswers(data.sessionToken)) || {}
      currentAnswers[data.questionId] = {
        selectedAnswer: data.selectedAnswer,
        timeSpent: data.timeSpent,
        isMarkedForReview: data.isMarkedForReview,
        timestamp: new Date().toISOString(),
      }
      await TestSessionCacheService.cacheSessionAnswers(data.sessionToken, currentAnswers)

      return response
    } catch (error) {
      console.error('Failed to submit answer:', error)
      return null
    }
  }

  static async submitTest(sessionToken: string): Promise<test_sessions | null> {
    try {
      return await DatabaseUtils.transaction(async (tx) => {
        // OPTIMIZED: Get the test session with responses in a single query
        // This prevents N+1 by eager loading all questions at once
        const session = await tx.test_sessions.findUnique({
          where: { sessionToken },
          include: {
            test_templates: true,
            user_question_responses: {
              include: {
                questions: {
                  // Only select fields needed for scoring
                  select: {
                    id: true,
                    marks: true,
                    correctAnswer: true,
                    difficulty: true,
                    topic: true,
                  },
                },
              },
            },
          },
        })

        if (!session || !session.test_templates) {
          throw new Error('Test session not found')
        }

        // Calculate total score
        let totalScore = 0
        let correctAnswers = 0

        for (const response of session.user_question_responses) {
          if (response.isCorrect) {
            totalScore += response.questions.marks
            correctAnswers++
          } else if (session.test_templates.negativeMarking) {
            // Apply negative marking if enabled
            const markingScheme = session.test_templates.markingScheme as any
            if (markingScheme?.incorrect) {
              totalScore += markingScheme.incorrect // This should be negative
            }
          }
        }

        const percentage =
          session.test_templates.totalMarks > 0
            ? (totalScore / session.test_templates.totalMarks) * 100
            : 0

        // Update session with final results
        const updatedSession = await tx.test_sessions.update({
          where: { sessionToken },
          data: {
            status: 'COMPLETED',
            submittedAt: new Date(),
            totalScore,
            percentage,
          },
        })

        // Create test attempt record
        await tx.test_attempts.create({
          data: {
            freeUserId: session.freeUserId,
            testTemplateId: session.testTemplateId,
            title: session.test_templates.title,
            topics: session.test_templates.topics,
            difficulty: session.test_templates.difficulty,
            questionCount: session.test_templates.totalQuestions,
            timeLimit: session.test_templates.timeLimit,
            score: totalScore,
            totalMarks: session.test_templates.totalMarks,
            percentage,
            timeSpent: session.timeSpent,
            topicWiseScore: {},
            status: 'COMPLETED',
            submittedAt: new Date(),
          } as any,
        })

        // Update template attempt count
        await tx.test_templates.update({
          where: { id: session.testTemplateId },
          data: {
            attemptCount: {
              increment: 1,
            },
          },
        })

        return updatedSession
      })
    } catch (error) {
      console.error('Failed to submit test:', error)
      return null
    }
  }

  // Question Management for Tests
  static async getQuestionsForTest(testTemplateId: string, count?: number): Promise<questions[]> {
    try {
      const template = await this.getTestTemplateById(testTemplateId)
      if (!template) {
        throw new Error('Test template not found')
      }

      const questionCount = count || template.totalQuestions
      const topics = JSON.parse(template.topics as string) as string[]

      // Get questions based on template configuration
      let questions: questions[] = []

      if (template.isAdaptive) {
        // For adaptive tests, start with medium difficulty
        questions = await prisma.questions.findMany({
          where: {
            topic: { in: topics },
            curriculum: template.curriculum,
            grade: template.grade,
            subject: template.subject,
            difficulty: 'MEDIUM',
            isActive: true,
            isVerified: true,
          },
          take: questionCount,
          orderBy: {
            popularityScore: 'desc',
          },
        })
      } else {
        // For regular tests, distribute questions according to questionDistribution
        const distribution = template.questionDistribution
          ? JSON.parse(template.questionDistribution as string)
          : null

        if (distribution) {
          // Get questions based on topic distribution
          for (const [topic, topicCount] of Object.entries(distribution)) {
            const topicQuestions = await prisma.questions.findMany({
              where: {
                topic: topic,
                curriculum: template.curriculum,
                grade: template.grade,
                subject: template.subject,
                difficulty: template.difficulty,
                isActive: true,
                isVerified: true,
              },
              take: topicCount as number,
              orderBy: {
                popularityScore: 'desc',
              },
            })
            questions.push(...topicQuestions)
          }
        } else {
          // Get random questions from all topics
          questions = await prisma.questions.findMany({
            where: {
              topic: { in: topics },
              curriculum: template.curriculum,
              grade: template.grade,
              subject: template.subject,
              difficulty: template.difficulty,
              isActive: true,
              isVerified: true,
            },
            take: questionCount,
            orderBy: {
              popularityScore: 'desc',
            },
          })
        }
      }

      // Shuffle questions for randomization
      return this.shuffleArray(questions).slice(0, questionCount)
    } catch (error) {
      console.error('Failed to get questions for test:', error)
      return []
    }
  }

  static async getAdaptiveNextQuestion(
    sessionToken: string,
    currentPerformance: number
  ): Promise<questions | null> {
    try {
      const session = await prisma.test_sessions.findUnique({
        where: { sessionToken },
        include: {
          test_templates: true,
        },
      })

      if (!session || !session.test_templates) {
        return null
      }

      // Determine next difficulty based on current performance
      let nextDifficulty: 'EASY' | 'MEDIUM' | 'HARD'
      if (currentPerformance >= 80) {
        nextDifficulty = 'HARD'
      } else if (currentPerformance >= 60) {
        nextDifficulty = 'MEDIUM'
      } else {
        nextDifficulty = 'EASY'
      }

      const topics = JSON.parse(session.test_templates.topics as string) as string[]

      // Get answered question IDs to avoid repetition
      const answeredQuestions = await prisma.user_question_responses.findMany({
        where: { testSessionId: session.id },
        select: { questionId: true },
      })

      const answeredIds = answeredQuestions.map((q) => q.questionId)

      const question = await prisma.questions.findFirst({
        where: {
          topic: { in: topics },
          curriculum: session.test_templates.curriculum,
          grade: session.test_templates.grade,
          subject: session.test_templates.subject,
          difficulty: nextDifficulty,
          id: { notIn: answeredIds },
          isActive: true,
          isVerified: true,
        },
        orderBy: {
          popularityScore: 'desc',
        },
      })

      return question
    } catch (error) {
      console.error('Failed to get adaptive next question:', error)
      return null
    }
  }

  // Analytics and Performance
  static async generateTestAnalytics(sessionId: string): Promise<test_analytics | null> {
    try {
      const session = await prisma.test_sessions.findUnique({
        where: { id: sessionId },
        include: {
          test_templates: true,
          user_question_responses: {
            include: {
              questions: true,
            },
          },
        },
      })

      if (!session) {
        return null
      }

      const responses = session.user_question_responses
      const totalQuestions = responses.length
      const correctAnswers = responses.filter((r) => r.isCorrect).length
      const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0

      // Calculate time distribution
      const timeDistribution = responses.map((r) => ({
        questionId: r.questionId,
        timeSpent: r.timeSpent || 0,
      }))

      // Calculate difficulty-wise performance
      const difficultyPerformance = {
        easy: { attempted: 0, correct: 0 },
        medium: { attempted: 0, correct: 0 },
        hard: { attempted: 0, correct: 0 },
      }

      responses.forEach((response) => {
        const difficulty = response.questions.difficulty.toLowerCase()
        if (difficulty in difficultyPerformance) {
          difficultyPerformance[difficulty as keyof typeof difficultyPerformance].attempted++
          if (response.isCorrect) {
            difficultyPerformance[difficulty as keyof typeof difficultyPerformance].correct++
          }
        }
      })

      // Calculate topic-wise performance
      const topicPerformance: Record<string, { attempted: number; correct: number }> = {}
      responses.forEach((response) => {
        const topic = response.questions.topic
        if (!topicPerformance[topic]) {
          topicPerformance[topic] = { attempted: 0, correct: 0 }
        }
        topicPerformance[topic].attempted++
        if (response.isCorrect) {
          topicPerformance[topic].correct++
        }
      })

      const analytics = await prisma.test_analytics.create({
        data: {
          testSessionId: sessionId,
          totalTime: session.timeSpent,
          averageTimePerQ: totalQuestions > 0 ? session.timeSpent / totalQuestions : 0,
          questionsAttempted: totalQuestions,
          questionsCorrect: correctAnswers,
          accuracy,
          timeDistribution: JSON.stringify(timeDistribution),
          answerPattern: JSON.stringify(responses.map((r) => r.selectedAnswer)),
          easyQuestions: JSON.stringify(difficultyPerformance.easy),
          mediumQuestions: JSON.stringify(difficultyPerformance.medium),
          hardQuestions: JSON.stringify(difficultyPerformance.hard),
          topicPerformance: JSON.stringify(topicPerformance),
          strengthTopics: JSON.stringify(
            Object.entries(topicPerformance)
              .filter(([_, perf]) => perf.attempted > 0 && perf.correct / perf.attempted >= 0.8)
              .map(([topic]) => topic)
          ),
          weaknessTopics: JSON.stringify(
            Object.entries(topicPerformance)
              .filter(([_, perf]) => perf.attempted > 0 && perf.correct / perf.attempted < 0.6)
              .map(([topic]) => topic)
          ),
        } as any,
      })

      return analytics
    } catch (error) {
      console.error('Failed to generate test analytics:', error)
      return null
    }
  }

  // Utility functions
  private static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Cleanup and maintenance
  static async cleanupExpiredSessions(): Promise<number> {
    try {
      const expiredSessions = await prisma.test_sessions.findMany({
        where: {
          status: { in: ['IN_PROGRESS', 'PAUSED'] },
          updatedAt: {
            lt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
          },
        },
      })

      let cleanedCount = 0
      for (const session of expiredSessions) {
        await prisma.test_sessions.update({
          where: { id: session.id },
          data: { status: 'EXPIRED' },
        })

        cleanedCount++
      }

      return cleanedCount
    } catch (error) {
      console.error('Failed to cleanup expired sessions:', error)
      return 0
    }
  }

  static async updatePopularityScores(): Promise<void> {
    try {
      // Update test template popularity scores
      const templates = await prisma.test_templates.findMany({
        include: {
          test_sessions: {
            where: {
              createdAt: {
                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
              },
            },
          },
        },
      })

      for (const template of templates) {
        const recentAttempts = template.test_sessions.length
        const popularityScore = Math.log(recentAttempts + 1) * template.attemptCount

        await prisma.test_templates.update({
          where: { id: template.id },
          data: { popularityScore },
        })
      }

      console.log('Updated popularity scores for test templates')
    } catch (error) {
      console.error('Failed to update popularity scores:', error)
    }
  }
}

export default TestService
