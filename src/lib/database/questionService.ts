import { prisma, DatabaseUtils } from './connection'
import { QuestionCacheService } from '../cache/redis'
import type {
  questions,
  question_banks,
  question_bank_questions,
  user_question_responses,
  Prisma,
} from '@/generated/prisma'

export interface CreateQuestionInput {
  topic: string
  subtopic?: string
  curriculum: string
  grade: string
  subject: string
  type: string
  difficulty: string
  question: string
  options?: string[]
  correctAnswer: string
  explanation?: string
  solutionSteps?: string[]
  questionImage?: string
  explanationImage?: string
  videoExplanation?: string
  source?: string
  examYear?: number
  marks: number
  timeLimit?: number
  tags?: string[]
  relatedConcepts?: string[]
  keywords?: string[]
  category: string
  verifiedBy?: string
}

export interface QuestionFilters {
  topics?: string[]
  subtopics?: string[]
  curriculum?: string
  grade?: string
  subject?: string
  type?: string
  difficulty?: string[]
  source?: string
  examYear?: number
  category?: string
  isActive?: boolean
  isVerified?: boolean
  search?: string
  minMarks?: number
  maxMarks?: number
  hasImage?: boolean
  hasVideo?: boolean
}

export interface RandomQuestionFilters {
  count: number
  topics?: string[]
  difficulty?: string[]
  curriculum?: string
  grade?: string
  subject?: string
  excludeIds?: string[]
  includeOnlyVerified?: boolean
}

export class QuestionService {
  // Question CRUD Operations
  static async createQuestion(data: CreateQuestionInput): Promise<questions> {
    try {
      const question = await prisma.questions.create({
        data: {
          ...data,
          options: data.options ? JSON.stringify(data.options) : null,
          solutionSteps: data.solutionSteps ? JSON.stringify(data.solutionSteps) : null,
          tags: data.tags ? JSON.stringify(data.tags) : null,
          relatedConcepts: data.relatedConcepts ? JSON.stringify(data.relatedConcepts) : null,
          keywords: data.keywords ? JSON.stringify(data.keywords) : null,
          popularityScore: 0,
          isActive: true,
          isVerified: !!data.verifiedBy,
          qualityScore: data.verifiedBy ? 4.0 : null,
        } as any,
      })

      // Cache the new question
      await QuestionCacheService.cacheQuestion(question)

      return question
    } catch (error) {
      console.error('Failed to create question:', error)
      throw new Error('Failed to create question')
    }
  }

  static async getQuestionById(id: string): Promise<questions | null> {
    try {
      // Try cache first
      const cached = await QuestionCacheService.getQuestion(id)
      if (cached) {
        return cached
      }

      const question = await prisma.questions.findUnique({
        where: { id },
      })

      if (question) {
        await QuestionCacheService.cacheQuestion(question)
      }

      return question
    } catch (error) {
      console.error('Failed to fetch question:', error)
      return null
    }
  }

  static async updateQuestion(
    id: string,
    data: Partial<CreateQuestionInput>
  ): Promise<questions | null> {
    try {
      const question = await prisma.questions.update({
        where: { id },
        data: {
          ...data,
          options: data.options ? JSON.stringify(data.options) : undefined,
          solutionSteps: data.solutionSteps ? JSON.stringify(data.solutionSteps) : undefined,
          tags: data.tags ? JSON.stringify(data.tags) : undefined,
          relatedConcepts: data.relatedConcepts ? JSON.stringify(data.relatedConcepts) : undefined,
          keywords: data.keywords ? JSON.stringify(data.keywords) : undefined,
          updatedAt: new Date(),
        } as any,
      })

      // Update cache
      await QuestionCacheService.cacheQuestion(question)

      return question
    } catch (error) {
      console.error('Failed to update question:', error)
      return null
    }
  }

  static async deleteQuestion(id: string): Promise<boolean> {
    try {
      await prisma.questions.update({
        where: { id },
        data: { isActive: false },
      })

      // Invalidate cache
      await QuestionCacheService.invalidateQuestion(id)

      return true
    } catch (error) {
      console.error('Failed to delete question:', error)
      return false
    }
  }

  // Question Search and Filtering
  static async searchQuestions(
    filters: QuestionFilters = {},
    page: number = 1,
    limit: number = 20
  ): Promise<{ questions: questions[]; total: number; hasMore: boolean }> {
    try {
      // Build where clause
      const where: Prisma.questionsWhereInput = {
        isActive: filters.isActive ?? true,
      }

      if (filters.topics && filters.topics.length > 0) {
        where.topic = { in: filters.topics }
      }

      if (filters.subtopics && filters.subtopics.length > 0) {
        where.subtopic = { in: filters.subtopics }
      }

      if (filters.curriculum) where.curriculum = filters.curriculum
      if (filters.grade) where.grade = filters.grade
      if (filters.subject) where.subject = filters.subject
      if (filters.type) where.type = filters.type as any
      if (filters.source) where.source = filters.source
      if (filters.examYear) where.examYear = filters.examYear
      if (filters.category) where.category = filters.category as any
      if (filters.isVerified !== undefined) where.isVerified = filters.isVerified

      if (filters.difficulty && filters.difficulty.length > 0) {
        where.difficulty = { in: filters.difficulty as any[] }
      }

      if (filters.minMarks || filters.maxMarks) {
        where.marks = {}
        if (filters.minMarks) where.marks.gte = filters.minMarks
        if (filters.maxMarks) where.marks.lte = filters.maxMarks
      }

      if (filters.hasImage) {
        where.questionImage = { not: null }
      }

      if (filters.hasVideo) {
        where.videoExplanation = { not: null }
      }

      if (filters.search) {
        where.OR = [
          { question: { contains: filters.search, mode: 'insensitive' } },
          { topic: { contains: filters.search, mode: 'insensitive' } },
          { subtopic: { contains: filters.search, mode: 'insensitive' } },
        ]
      }

      // Get paginated results
      const [questions, total] = await Promise.all([
        prisma.questions.findMany({
          where,
          orderBy: [{ popularityScore: 'desc' }, { qualityScore: 'desc' }, { createdAt: 'desc' }],
          ...DatabaseUtils.getPaginationParams(page, limit),
        }),
        prisma.questions.count({ where }),
      ])

      return {
        questions,
        total,
        hasMore: page * limit < total,
      }
    } catch (error) {
      console.error('Failed to search questions:', error)
      return { questions: [], total: 0, hasMore: false }
    }
  }

  static async getQuestionsByTopic(
    topic: string,
    difficulty?: string,
    curriculum: string = 'NEET',
    grade: string = 'CLASS_12',
    page: number = 1,
    limit: number = 20
  ): Promise<questions[]> {
    try {
      // Try cache first
      const cached = await QuestionCacheService.getQuestionsByTopic(topic, difficulty, page)
      if (cached) {
        return cached
      }

      const where: Prisma.questionsWhereInput = {
        topic,
        curriculum,
        grade,
        isActive: true,
        isVerified: true,
      }

      if (difficulty) {
        where.difficulty = difficulty as any
      }

      const questions = await prisma.questions.findMany({
        where,
        orderBy: [{ popularityScore: 'desc' }, { totalAttempts: 'desc' }],
        ...DatabaseUtils.getPaginationParams(page, limit),
      })

      // Cache the results
      await QuestionCacheService.cacheQuestionsByTopic(topic, questions, difficulty, page)

      return questions
    } catch (error) {
      console.error('Failed to fetch questions by topic:', error)
      return []
    }
  }

  static async getRandomQuestions(filters: RandomQuestionFilters): Promise<questions[]> {
    try {
      // Try cache first
      const cached = await QuestionCacheService.getRandomQuestions(filters)
      if (cached && cached.length >= filters.count) {
        return this.shuffleArray(cached).slice(0, filters.count)
      }

      const where: Prisma.questionsWhereInput = {
        isActive: true,
        isVerified: filters.includeOnlyVerified ?? true,
      }

      if (filters.topics && filters.topics.length > 0) {
        where.topic = { in: filters.topics }
      }

      if (filters.difficulty && filters.difficulty.length > 0) {
        where.difficulty = { in: filters.difficulty as any[] }
      }

      if (filters.curriculum) where.curriculum = filters.curriculum
      if (filters.grade) where.grade = filters.grade
      if (filters.subject) where.subject = filters.subject

      if (filters.excludeIds && filters.excludeIds.length > 0) {
        where.id = { notIn: filters.excludeIds }
      }

      // Get more questions than needed to allow for randomization
      const questions = await prisma.questions.findMany({
        where,
        orderBy: {
          popularityScore: 'desc',
        },
        take: filters.count * 2, // Get double to ensure randomness
      })

      const randomQuestions = this.shuffleArray(questions).slice(0, filters.count)

      // Cache the results
      await QuestionCacheService.cacheRandomQuestions(randomQuestions, filters)

      return randomQuestions
    } catch (error) {
      console.error('Failed to fetch random questions:', error)
      return []
    }
  }

  // Question Bank Management
  static async createQuestionBank(data: {
    name: string
    description?: string
    category: string
    curriculum: string
    grade: string
    subject: string
    topics?: string[]
    isPublic?: boolean
    createdBy?: string
  }): Promise<question_banks> {
    try {
      const questionBank = await prisma.question_banks.create({
        data: {
          ...data,
          topics: data.topics ? JSON.stringify(data.topics) : null,
          totalQuestions: 0,
          activeQuestions: 0,
          usageCount: 0,
          isActive: true,
          isPublic: data.isPublic ?? false,
        } as any,
      })

      return questionBank
    } catch (error) {
      console.error('Failed to create question bank:', error)
      throw new Error('Failed to create question bank')
    }
  }

  static async addQuestionToBank(
    questionBankId: string,
    questionId: string,
    orderIndex?: number
  ): Promise<question_bank_questions | null> {
    try {
      // Get current max order index if not provided
      if (!orderIndex) {
        const maxOrder = await prisma.question_bank_questions.findFirst({
          where: { questionBankId },
          orderBy: { orderIndex: 'desc' },
          select: { orderIndex: true },
        })
        orderIndex = (maxOrder?.orderIndex || 0) + 1
      }

      const bankQuestion = await prisma.question_bank_questions.create({
        data: {
          questionBankId,
          questionId,
          orderIndex,
        } as any,
      })

      // Update question bank totals
      await this.updateQuestionBankStats(questionBankId)

      return bankQuestion
    } catch (error) {
      console.error('Failed to add question to bank:', error)
      return null
    }
  }

  static async removeQuestionFromBank(
    questionBankId: string,
    questionId: string
  ): Promise<boolean> {
    try {
      await prisma.question_bank_questions.deleteMany({
        where: {
          questionBankId,
          questionId,
        },
      })

      // Update question bank totals
      await this.updateQuestionBankStats(questionBankId)

      return true
    } catch (error) {
      console.error('Failed to remove question from bank:', error)
      return false
    }
  }

  static async getQuestionBank(id: string): Promise<question_banks | null> {
    try {
      // OPTIMIZED: Single query with selective field loading to prevent N+1
      // This loads all questions in one go instead of separate queries
      return await prisma.question_banks.findUnique({
        where: { id },
        include: {
          question_bank_questions: {
            include: {
              questions: {
                // Select only necessary fields to reduce data transfer
                select: {
                  id: true,
                  topic: true,
                  subtopic: true,
                  difficulty: true,
                  question: true,
                  options: true,
                  correctAnswer: true,
                  explanation: true,
                  marks: true,
                  timeLimit: true,
                  questionImage: true,
                  type: true,
                  curriculum: true,
                  grade: true,
                  subject: true,
                  isActive: true,
                  isVerified: true,
                  tags: true,
                },
              },
            },
            orderBy: { orderIndex: 'asc' },
          },
        },
      })
    } catch (error) {
      console.error('Failed to fetch question bank:', error)
      return null
    }
  }

  static async getQuestionBanks(
    filters: {
      category?: string
      curriculum?: string
      grade?: string
      subject?: string
      isPublic?: boolean
      isActive?: boolean
    } = {},
    page: number = 1,
    limit: number = 20
  ): Promise<{ banks: question_banks[]; total: number; hasMore: boolean }> {
    try {
      const where: Prisma.question_banksWhereInput = {
        isActive: filters.isActive ?? true,
      }

      if (filters.category) where.category = filters.category as any
      if (filters.curriculum) where.curriculum = filters.curriculum
      if (filters.grade) where.grade = filters.grade
      if (filters.subject) where.subject = filters.subject
      if (filters.isPublic !== undefined) where.isPublic = filters.isPublic

      const [banks, total] = await Promise.all([
        prisma.question_banks.findMany({
          where,
          orderBy: [{ usageCount: 'desc' }, { createdAt: 'desc' }],
          ...DatabaseUtils.getPaginationParams(page, limit),
        }),
        prisma.question_banks.count({ where }),
      ])

      return {
        banks,
        total,
        hasMore: page * limit < total,
      }
    } catch (error) {
      console.error('Failed to fetch question banks:', error)
      return { banks: [], total: 0, hasMore: false }
    }
  }

  private static async updateQuestionBankStats(questionBankId: string): Promise<void> {
    try {
      const stats = await prisma.question_bank_questions.aggregate({
        where: { questionBankId },
        _count: { id: true },
      })

      const activeCount = await prisma.question_bank_questions.count({
        where: {
          questionBankId,
          questions: { isActive: true },
        },
      })

      await prisma.question_banks.update({
        where: { id: questionBankId },
        data: {
          totalQuestions: stats._count.id,
          activeQuestions: activeCount,
        },
      })
    } catch (error) {
      console.error('Failed to update question bank stats:', error)
    }
  }

  // Question Analytics and Performance
  static async updateQuestionPerformance(
    questionId: string,
    isCorrect: boolean,
    timeSpent: number
  ): Promise<void> {
    try {
      const question = await prisma.questions.findUnique({
        where: { id: questionId },
        select: { totalAttempts: true, correctAttempts: true, averageTime: true },
      })

      if (!question) return

      const newTotalAttempts = question.totalAttempts + 1
      const newCorrectAttempts = question.correctAttempts + (isCorrect ? 1 : 0)

      // Calculate new average time
      const currentTotalTime = (question.averageTime || 0) * question.totalAttempts
      const newAverageTime = Math.round((currentTotalTime + timeSpent) / newTotalAttempts)

      await prisma.questions.update({
        where: { id: questionId },
        data: {
          totalAttempts: newTotalAttempts,
          correctAttempts: newCorrectAttempts,
          averageTime: newAverageTime,
          lastUsed: new Date(),
        },
      })

      // Invalidate cache to refresh with new stats
      await QuestionCacheService.invalidateQuestion(questionId)
    } catch (error) {
      console.error('Failed to update question performance:', error)
    }
  }

  static async getQuestionAnalytics(questionId: string): Promise<{
    totalAttempts: number
    correctAttempts: number
    accuracy: number
    averageTime: number
    difficultyRating: number
    recentPerformance: { date: string; attempts: number; accuracy: number }[]
  } | null> {
    try {
      const question = await prisma.questions.findUnique({
        where: { id: questionId },
      })

      if (!question) return null

      const accuracy =
        question.totalAttempts > 0 ? (question.correctAttempts / question.totalAttempts) * 100 : 0

      // Get recent performance (last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const recentResponses = await prisma.user_question_responses.findMany({
        where: {
          questionId,
          answeredAt: { gte: thirtyDaysAgo },
        },
        orderBy: { answeredAt: 'asc' },
      })

      // Group by date
      const dailyPerformance: Record<string, { attempts: number; correct: number }> = {}

      recentResponses.forEach((response) => {
        const date = response.answeredAt.toISOString().split('T')[0]
        if (!dailyPerformance[date]) {
          dailyPerformance[date] = { attempts: 0, correct: 0 }
        }
        dailyPerformance[date].attempts++
        if (response.isCorrect) {
          dailyPerformance[date].correct++
        }
      })

      const recentPerformance = Object.entries(dailyPerformance).map(([date, perf]) => ({
        date,
        attempts: perf.attempts,
        accuracy: perf.attempts > 0 ? (perf.correct / perf.attempts) * 100 : 0,
      }))

      return {
        totalAttempts: question.totalAttempts,
        correctAttempts: question.correctAttempts,
        accuracy,
        averageTime: question.averageTime || 0,
        difficultyRating: question.difficultyRating || 0,
        recentPerformance,
      }
    } catch (error) {
      console.error('Failed to get question analytics:', error)
      return null
    }
  }

  // Bulk Operations
  static async bulkCreateQuestions(questions: CreateQuestionInput[]): Promise<number> {
    try {
      const questionData = questions.map((q) => ({
        ...q,
        options: q.options ? JSON.stringify(q.options) : null,
        solutionSteps: q.solutionSteps ? JSON.stringify(q.solutionSteps) : null,
        tags: q.tags ? JSON.stringify(q.tags) : null,
        relatedConcepts: q.relatedConcepts ? JSON.stringify(q.relatedConcepts) : null,
        keywords: q.keywords ? JSON.stringify(q.keywords) : null,
        popularityScore: 0,
        isActive: true,
        isVerified: !!q.verifiedBy,
        qualityScore: q.verifiedBy ? 4.0 : null,
      }))

      const result = await DatabaseUtils.bulkCreate('questions' as any, questionData)
      return result
    } catch (error) {
      console.error('Failed to bulk create questions:', error)
      return 0
    }
  }

  static async updatePopularityScores(): Promise<void> {
    try {
      // OPTIMIZED: Load questions with aggregated response count instead of all responses
      // This prevents loading thousands of response records
      const questions = await prisma.questions.findMany({
        select: {
          id: true,
          totalAttempts: true,
          qualityScore: true,
          _count: {
            select: {
              user_question_responses: {
                where: {
                  answeredAt: {
                    gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                  },
                },
              },
            },
          },
        },
      })

      // OPTIMIZED: Batch update using transaction for better performance
      const updates = questions.map((question) => {
        const recentUsage = question._count.user_question_responses
        const totalUsage = question.totalAttempts
        const qualityScore = question.qualityScore || 3.0

        // Calculate popularity score based on recent usage, total usage, and quality
        const popularityScore =
          Math.log(recentUsage + 1) * 2 + Math.log(totalUsage + 1) + qualityScore

        return {
          id: question.id,
          popularityScore,
        }
      })

      // Batch update in chunks of 100 to avoid memory issues
      for (let i = 0; i < updates.length; i += 100) {
        const chunk = updates.slice(i, i + 100)
        await Promise.all(
          chunk.map((update) =>
            prisma.questions.update({
              where: { id: update.id },
              data: { popularityScore: update.popularityScore },
            })
          )
        )
      }

      console.log('Updated popularity scores for questions')
    } catch (error) {
      console.error('Failed to update popularity scores:', error)
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

  // Quality Control
  static async reportQuestion(
    questionId: string,
    reportReason: string,
    reportedBy?: string
  ): Promise<boolean> {
    try {
      await prisma.questions.update({
        where: { id: questionId },
        data: {
          reportCount: { increment: 1 },
        },
      })

      // If report count exceeds threshold, deactivate question
      const question = await prisma.questions.findUnique({
        where: { id: questionId },
        select: { reportCount: true },
      })

      if (question && question.reportCount >= 5) {
        await prisma.questions.update({
          where: { id: questionId },
          data: { isActive: false },
        })

        // Invalidate cache
        await QuestionCacheService.invalidateQuestion(questionId)
      }

      return true
    } catch (error) {
      console.error('Failed to report question:', error)
      return false
    }
  }

  static async verifyQuestion(
    questionId: string,
    verifiedBy: string,
    qualityScore: number = 4.0
  ): Promise<boolean> {
    try {
      await prisma.questions.update({
        where: { id: questionId },
        data: {
          isVerified: true,
          verifiedBy,
          qualityScore,
          reportCount: 0, // Reset report count on verification
        },
      })

      // Invalidate cache to refresh with new verification status
      await QuestionCacheService.invalidateQuestion(questionId)

      return true
    } catch (error) {
      console.error('Failed to verify question:', error)
      return false
    }
  }
}

export default QuestionService
