// Database Services Export
export { default as prisma } from './connection'
export { checkDatabaseConnection, closeDatabaseConnection, DatabaseUtils } from './connection'

// Service Classes
export { UserService } from './userService'
export { TestService } from './testService'
export { QuestionService } from './questionService'
export { AnalyticsService } from './analyticsService'

// Import for internal use
import { checkDatabaseConnection } from './connection'
import { UserService } from './userService'
import { TestService } from './testService'
import { QuestionService } from './questionService'
import { AnalyticsService } from './analyticsService'

// Type Exports
export type {
  CreateFreeUserInput,
  UpdateUserProgressInput,
  UserPerformanceMetrics,
} from './userService'

export type {
  CreateTestTemplateInput,
  StartTestSessionInput,
  SubmitAnswerInput,
  TestFilters,
} from './testService'

export type { CreateQuestionInput, QuestionFilters, RandomQuestionFilters } from './questionService'

export type {
  GlobalStats,
  TopicAnalytics,
  UserPerformanceAnalytics,
  LeaderboardEntry,
} from './analyticsService'

// Database Health Check
export async function healthCheck(): Promise<{
  database: boolean
  services: { [key: string]: boolean }
}> {
  try {
    const dbHealth = await checkDatabaseConnection()

    // Test each service
    const serviceTests = await Promise.allSettled([
      UserService.getFreeUserById('test'),
      TestService.getTestTemplateById('test'),
      QuestionService.getQuestionById('test'),
      AnalyticsService.getGlobalStats(),
    ])

    const services = {
      userService: serviceTests[0].status === 'fulfilled',
      testService: serviceTests[1].status === 'fulfilled',
      questionService: serviceTests[2].status === 'fulfilled',
      analyticsService: serviceTests[3].status === 'fulfilled',
    }

    return {
      database: dbHealth,
      services,
    }
  } catch (error) {
    console.error('Database health check failed:', error)
    return {
      database: false,
      services: {
        userService: false,
        testService: false,
        questionService: false,
        analyticsService: false,
      },
    }
  }
}
