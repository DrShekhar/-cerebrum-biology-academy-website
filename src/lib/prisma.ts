import { PrismaClient } from '../generated/prisma'
import { logger } from './utils/logger'

// Global variable to store Prisma client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Mock Prisma client for fallback when WASM engine fails
class MockPrismaClient {
  private logWarning(operation: string) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`[CRITICAL] MockPrismaClient used in production for operation: ${operation}. Database is unavailable.`)
    } else {
      console.warn(`[MockPrismaClient] Database operation attempted: ${operation}`)
    }
  }

  users = {
    findUnique: async () => {
      this.logWarning('users.findUnique')
      return null
    },
    findFirst: async () => {
      this.logWarning('users.findFirst')
      return null
    },
    findMany: async () => {
      this.logWarning('users.findMany')
      return []
    },
    create: async () => {
      this.logWarning('users.create')
      return null
    },
    update: async () => {
      this.logWarning('users.update')
      return null
    },
    delete: async () => {
      this.logWarning('users.delete')
      return null
    },
  }

  whatsapp_otp = {
    findFirst: async () => {
      this.logWarning('whatsapp_otp.findFirst')
      return null
    },
    create: async () => {
      this.logWarning('whatsapp_otp.create')
      return null
    },
    update: async () => {
      this.logWarning('whatsapp_otp.update')
      return null
    },
    delete: async () => {
      this.logWarning('whatsapp_otp.delete')
      return null
    },
    count: async () => {
      this.logWarning('whatsapp_otp.count')
      return 0
    },
  }

  otpVerification = {
    findMany: async () => {
      this.logWarning('otpVerification.findMany')
      return []
    },
    create: async () => {
      this.logWarning('otpVerification.create')
      return null
    },
  }

  // LMS Study Materials - required for /api/admin/lms/materials routes
  studyMaterial = {
    findUnique: async () => {
      this.logWarning('studyMaterial.findUnique')
      return null
    },
    findFirst: async () => {
      this.logWarning('studyMaterial.findFirst')
      return null
    },
    findMany: async () => {
      this.logWarning('studyMaterial.findMany')
      return []
    },
    create: async () => {
      this.logWarning('studyMaterial.create')
      return null
    },
    update: async () => {
      this.logWarning('studyMaterial.update')
      return null
    },
    delete: async () => {
      this.logWarning('studyMaterial.delete')
      return null
    },
    count: async () => {
      this.logWarning('studyMaterial.count')
      return 0
    },
  }

  // LMS Courses
  course = {
    findUnique: async () => {
      this.logWarning('course.findUnique')
      return null
    },
    findMany: async () => {
      this.logWarning('course.findMany')
      return []
    },
  }

  // LMS Chapters
  chapter = {
    findUnique: async () => {
      this.logWarning('chapter.findUnique')
      return null
    },
    findMany: async () => {
      this.logWarning('chapter.findMany')
      return []
    },
  }

  // LMS Topics
  topic = {
    findUnique: async () => {
      this.logWarning('topic.findUnique')
      return null
    },
    findMany: async () => {
      this.logWarning('topic.findMany')
      return []
    },
  }

  // Biology Topics - required for /biology-notes page
  biology_topics = {
    findUnique: async () => {
      this.logWarning('biology_topics.findUnique')
      return null
    },
    findMany: async () => {
      this.logWarning('biology_topics.findMany')
      return []
    },
    count: async () => {
      this.logWarning('biology_topics.count')
      return 0
    },
  }

  // Analytics Events - required for trial event tracking
  analytics_events = {
    create: async () => {
      this.logWarning('analytics_events.create')
      return null
    },
    findMany: async () => {
      this.logWarning('analytics_events.findMany')
      return []
    },
  }

  // Free Users - required for trial management
  free_users = {
    findUnique: async () => {
      this.logWarning('free_users.findUnique')
      return null
    },
    findMany: async () => {
      this.logWarning('free_users.findMany')
      return []
    },
    create: async () => {
      this.logWarning('free_users.create')
      return null
    },
    update: async () => {
      this.logWarning('free_users.update')
      return null
    },
    count: async () => {
      this.logWarning('free_users.count')
      return 0
    },
  }

  // Test Sessions
  test_sessions = {
    findMany: async () => {
      this.logWarning('test_sessions.findMany')
      return []
    },
    create: async () => {
      this.logWarning('test_sessions.create')
      return null
    },
    updateMany: async () => {
      this.logWarning('test_sessions.updateMany')
      return { count: 0 }
    },
  }

  // User Progress
  user_progress = {
    findMany: async () => {
      this.logWarning('user_progress.findMany')
      return []
    },
    updateMany: async () => {
      this.logWarning('user_progress.updateMany')
      return { count: 0 }
    },
  }

  // User Question Responses
  user_question_responses = {
    findMany: async () => {
      this.logWarning('user_question_responses.findMany')
      return []
    },
    updateMany: async () => {
      this.logWarning('user_question_responses.updateMany')
      return { count: 0 }
    },
  }

  // Performance Reports
  performance_reports = {
    findMany: async () => {
      this.logWarning('performance_reports.findMany')
      return []
    },
    updateMany: async () => {
      this.logWarning('performance_reports.updateMany')
      return { count: 0 }
    },
  }

  // Test Attempts
  test_attempts = {
    findMany: async () => {
      this.logWarning('test_attempts.findMany')
      return []
    },
    create: async () => {
      this.logWarning('test_attempts.create')
      return null
    },
  }

  $connect = async () => {
    this.logWarning('$connect')
    return Promise.resolve()
  }
  $disconnect = async () => {
    this.logWarning('$disconnect')
    return Promise.resolve()
  }
  $queryRaw = async () => {
    this.logWarning('$queryRaw')
    return []
  }
  $transaction = async <T>(fn: (client: MockPrismaClient) => Promise<T>): Promise<T> => {
    this.logWarning('$transaction')
    return fn(this)
  }
}

// Create Prisma client with enhanced error handling and WASM fallback
function createPrismaClient() {
  try {
    // Detect Edge Runtime and return mock client to avoid process.nextTick errors
    if (
      typeof (globalThis as any).EdgeRuntime !== 'undefined' ||
      (globalThis as any).EdgeRuntime ||
      typeof process.nextTick !== 'function'
    ) {
      logger.warn('Edge Runtime detected, using mock Prisma client', {
        runtime: 'edge',
        fallback: 'mock_client',
      })
      return new MockPrismaClient() as any
    }

    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      logger.warn('DATABASE_URL not found, using mock Prisma client', {
        fallback: 'mock_client',
      })
      return new MockPrismaClient() as any
    }

    const client = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? [] : ['error'], // Minimal logging to reduce noise
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      // Configure for edge runtime compatibility
      errorFormat: 'minimal',
    })

    // Test the client connection in a non-blocking way (only in non-build environments)
    // Skip in Edge Runtime contexts to avoid compatibility issues
    if (
      process.env.NODE_ENV !== 'production' &&
      !process.env.VERCEL_ENV &&
      typeof process.nextTick === 'function'
    ) {
      // Defer connection test to avoid blocking initialization
      Promise.resolve().then(async () => {
        try {
          await client.$queryRaw`SELECT 1`
          logger.info('Prisma client initialized successfully', {
            environment: process.env.NODE_ENV,
          })
        } catch (error) {
          logger.warn('Prisma connection test failed, operations may fallback to mock', {
            error,
          })
        }
      })
    }

    return client
  } catch (error) {
    logger.error('Prisma client initialization failed, using mock client', {
      error,
      fallback: 'mock_client',
    })
    return new MockPrismaClient() as any
  }
}

// Lazy initialization of Prisma client with comprehensive error handling
export const prisma = globalForPrisma.prisma ?? createPrismaClient()

// Prevent multiple instances of Prisma Client in development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Database connection helper
export async function connectToDatabase() {
  if (!prisma) {
    logger.warn('Prisma client not available for connection', {
      action: 'connect_database',
    })
    return false
  }
  try {
    await prisma.$connect()
    logger.info('Successfully connected to database', {
      database: 'postgresql',
    })
    return true
  } catch (error) {
    logger.error('Failed to connect to database', { error })
    return false
  }
}

// Database disconnection helper
export async function disconnectFromDatabase() {
  if (!prisma) {
    logger.warn('Prisma client not available for disconnection', {
      action: 'disconnect_database',
    })
    return
  }
  try {
    await prisma.$disconnect()
    logger.info('Successfully disconnected from database')
  } catch (error) {
    logger.error('Error disconnecting from database', { error })
  }
}

// Health check for database
export async function checkDatabaseHealth() {
  if (!prisma) {
    return {
      status: 'unavailable',
      error: 'Prisma client not initialized',
      timestamp: new Date().toISOString(),
    }
  }
  try {
    await prisma.$queryRaw`SELECT 1`
    return { status: 'healthy', timestamp: new Date().toISOString() }
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }
  }
}

// Transaction helper
export async function withTransaction<T>(
  fn: (
    prisma: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$extends'>
  ) => Promise<T>
): Promise<T> {
  if (!prisma) {
    throw new Error('Database not available')
  }
  return prisma.$transaction(fn)
}

// Clean up function for graceful shutdown
export async function gracefulShutdown() {
  logger.info('Initiating graceful database shutdown', {
    action: 'graceful_shutdown',
  })
  await disconnectFromDatabase()
}

// Handle process termination
if (process.env.NODE_ENV === 'production') {
  process.on('SIGINT', gracefulShutdown)
  process.on('SIGTERM', gracefulShutdown)
}

export default prisma
