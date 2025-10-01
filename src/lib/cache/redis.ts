import Redis from 'ioredis'
import { Question, TestTemplate, TestSession, UserProgress } from '@/generated/prisma'

// Redis configuration optimized for high concurrency
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0'),

  // Connection pool configuration for 10,000+ concurrent users
  maxRetriesPerRequest: 3,
  retryDelayOnFailover: 100,
  enableReadyCheck: true,
  maxLoadingTimeout: 1000,

  // Performance optimizations
  lazyConnect: true,
  keepAlive: 30000,

  // Cluster configuration (if using Redis Cluster)
  enableOfflineQueue: false,

  // Command timeout
  commandTimeout: 5000,

  // Key prefix for multi-tenant support
  keyPrefix: 'cerebrum:',
})

// Connection event handlers
redis.on('connect', () => {
  console.log('✅ Redis connected successfully')
})

redis.on('error', (err) => {
  console.error('❌ Redis connection error:', err)
})

redis.on('ready', () => {
  console.log('🚀 Redis is ready to accept commands')
})

// Cache key generators with consistent naming
export const CacheKeys = {
  // Question caching
  question: (id: string) => `question:${id}`,
  questionsByTopic: (topic: string, difficulty?: string) =>
    `questions:topic:${topic}${difficulty ? `:${difficulty}` : ''}`,
  questionsBySubject: (subject: string, grade: string) =>
    `questions:subject:${subject}:grade:${grade}`,
  randomQuestions: (filters: string) => `questions:random:${filters}`,

  // Test template caching
  testTemplate: (id: string) => `test_template:${id}`,
  testTemplateBySlug: (slug: string) => `test_template:slug:${slug}`,
  testTemplatesList: (filters: string) => `test_templates:list:${filters}`,
  popularTests: () => 'test_templates:popular',

  // Test session caching
  testSession: (sessionToken: string) => `test_session:${sessionToken}`,
  activeTestSession: (userId: string) => `test_session:active:${userId}`,
  testSessionAnswers: (sessionToken: string) => `test_session:answers:${sessionToken}`,

  // User session and progress caching
  userSession: (userId: string) => `user_session:${userId}`,
  userProgress: (userId: string, topic: string) => `user_progress:${userId}:${topic}`,
  userPerformance: (userId: string) => `user_performance:${userId}`,
  userRecommendations: (userId: string) => `user_recommendations:${userId}`,

  // Analytics and performance data
  testAnalytics: (sessionId: string) => `test_analytics:${sessionId}`,
  globalStats: () => 'global_stats',
  topicStats: (topic: string) => `topic_stats:${topic}`,
  leaderboard: (type: string) => `leaderboard:${type}`,

  // Real-time data
  onlineUsers: () => 'online_users',
  activeTests: () => 'active_tests',

  // Rate limiting
  rateLimitUser: (userId: string) => `rate_limit:user:${userId}`,
  rateLimitIP: (ip: string) => `rate_limit:ip:${ip}`,
}

// Cache TTL values (in seconds)
export const CacheTTL = {
  QUESTION: 3600,           // 1 hour
  QUESTION_LIST: 1800,      // 30 minutes
  TEST_TEMPLATE: 3600,      // 1 hour
  TEST_SESSION: 1800,       // 30 minutes (active session)
  USER_PROGRESS: 300,       // 5 minutes
  USER_SESSION: 86400,      // 24 hours
  ANALYTICS: 3600,          // 1 hour
  GLOBAL_STATS: 300,        // 5 minutes
  LEADERBOARD: 600,         // 10 minutes
  REAL_TIME: 60,            // 1 minute
  RATE_LIMIT: 3600,         // 1 hour
}

// Question caching service
export class QuestionCacheService {
  // Cache a single question
  static async cacheQuestion(question: Question): Promise<void> {
    const key = CacheKeys.question(question.id)
    await redis.setex(key, CacheTTL.QUESTION, JSON.stringify(question))
  }

  // Get cached question
  static async getQuestion(id: string): Promise<Question | null> {
    const key = CacheKeys.question(id)
    const cached = await redis.get(key)
    return cached ? JSON.parse(cached) : null
  }

  // Cache questions by topic with pagination
  static async cacheQuestionsByTopic(
    topic: string,
    questions: Question[],
    difficulty?: string,
    page: number = 1
  ): Promise<void> {
    const key = CacheKeys.questionsByTopic(topic, difficulty)
    const pageKey = `${key}:page:${page}`
    await redis.setex(pageKey, CacheTTL.QUESTION_LIST, JSON.stringify(questions))

    // Cache total count
    const countKey = `${key}:count`
    await redis.setex(countKey, CacheTTL.QUESTION_LIST, questions.length.toString())
  }

  // Get cached questions by topic
  static async getQuestionsByTopic(
    topic: string,
    difficulty?: string,
    page: number = 1
  ): Promise<Question[] | null> {
    const key = CacheKeys.questionsByTopic(topic, difficulty)
    const pageKey = `${key}:page:${page}`
    const cached = await redis.get(pageKey)
    return cached ? JSON.parse(cached) : null
  }

  // Cache random questions with filters
  static async cacheRandomQuestions(
    questions: Question[],
    filters: Record<string, any>
  ): Promise<void> {
    const filterHash = Buffer.from(JSON.stringify(filters)).toString('base64')
    const key = CacheKeys.randomQuestions(filterHash)
    await redis.setex(key, CacheTTL.QUESTION_LIST, JSON.stringify(questions))
  }

  // Get cached random questions
  static async getRandomQuestions(filters: Record<string, any>): Promise<Question[] | null> {
    const filterHash = Buffer.from(JSON.stringify(filters)).toString('base64')
    const key = CacheKeys.randomQuestions(filterHash)
    const cached = await redis.get(key)
    return cached ? JSON.parse(cached) : null
  }

  // Invalidate question cache
  static async invalidateQuestion(id: string): Promise<void> {
    const pattern = `*question*${id}*`
    const keys = await redis.keys(pattern)
    if (keys.length > 0) {
      await redis.del(...keys)
    }
  }
}

// Test template caching service
export class TestTemplateCacheService {
  // Cache test template
  static async cacheTestTemplate(template: TestTemplate): Promise<void> {
    const idKey = CacheKeys.testTemplate(template.id)
    const slugKey = CacheKeys.testTemplateBySlug(template.slug)

    const templateData = JSON.stringify(template)
    await Promise.all([
      redis.setex(idKey, CacheTTL.TEST_TEMPLATE, templateData),
      redis.setex(slugKey, CacheTTL.TEST_TEMPLATE, templateData)
    ])
  }

  // Get cached test template by ID
  static async getTestTemplate(id: string): Promise<TestTemplate | null> {
    const key = CacheKeys.testTemplate(id)
    const cached = await redis.get(key)
    return cached ? JSON.parse(cached) : null
  }

  // Get cached test template by slug
  static async getTestTemplateBySlug(slug: string): Promise<TestTemplate | null> {
    const key = CacheKeys.testTemplateBySlug(slug)
    const cached = await redis.get(key)
    return cached ? JSON.parse(cached) : null
  }

  // Cache popular tests
  static async cachePopularTests(tests: TestTemplate[]): Promise<void> {
    const key = CacheKeys.popularTests()
    await redis.setex(key, CacheTTL.TEST_TEMPLATE, JSON.stringify(tests))
  }

  // Get cached popular tests
  static async getPopularTests(): Promise<TestTemplate[] | null> {
    const key = CacheKeys.popularTests()
    const cached = await redis.get(key)
    return cached ? JSON.parse(cached) : null
  }

  // Cache test templates list with filters
  static async cacheTestTemplatesList(
    tests: TestTemplate[],
    filters: Record<string, any>
  ): Promise<void> {
    const filterHash = Buffer.from(JSON.stringify(filters)).toString('base64')
    const key = CacheKeys.testTemplatesList(filterHash)
    await redis.setex(key, CacheTTL.TEST_TEMPLATE, JSON.stringify(tests))
  }

  // Get cached test templates list
  static async getTestTemplatesList(filters: Record<string, any>): Promise<TestTemplate[] | null> {
    const filterHash = Buffer.from(JSON.stringify(filters)).toString('base64')
    const key = CacheKeys.testTemplatesList(filterHash)
    const cached = await redis.get(key)
    return cached ? JSON.parse(cached) : null
  }
}

// Test session caching service (critical for real-time performance)
export class TestSessionCacheService {
  // Cache active test session
  static async cacheTestSession(session: TestSession): Promise<void> {
    const sessionKey = CacheKeys.testSession(session.sessionToken)
    const userKey = CacheKeys.activeTestSession(session.userId || session.freeUserId || '')

    const sessionData = JSON.stringify(session)
    await Promise.all([
      redis.setex(sessionKey, CacheTTL.TEST_SESSION, sessionData),
      redis.setex(userKey, CacheTTL.TEST_SESSION, session.sessionToken)
    ])
  }

  // Get cached test session
  static async getTestSession(sessionToken: string): Promise<TestSession | null> {
    const key = CacheKeys.testSession(sessionToken)
    const cached = await redis.get(key)
    return cached ? JSON.parse(cached) : null
  }

  // Get user's active test session
  static async getUserActiveSession(userId: string): Promise<string | null> {
    const key = CacheKeys.activeTestSession(userId)
    return await redis.get(key)
  }

  // Cache test session answers (for real-time auto-save)
  static async cacheSessionAnswers(
    sessionToken: string,
    answers: Record<string, any>
  ): Promise<void> {
    const key = CacheKeys.testSessionAnswers(sessionToken)
    await redis.setex(key, CacheTTL.TEST_SESSION, JSON.stringify(answers))
  }

  // Get cached session answers
  static async getSessionAnswers(sessionToken: string): Promise<Record<string, any> | null> {
    const key = CacheKeys.testSessionAnswers(sessionToken)
    const cached = await redis.get(key)
    return cached ? JSON.parse(cached) : null
  }

  // Update session progress (atomic operation)
  static async updateSessionProgress(
    sessionToken: string,
    progress: Partial<TestSession>
  ): Promise<void> {
    const session = await this.getTestSession(sessionToken)
    if (session) {
      const updatedSession = { ...session, ...progress, updatedAt: new Date() }
      await this.cacheTestSession(updatedSession)
    }
  }

  // Cleanup expired sessions
  static async cleanupExpiredSessions(): Promise<void> {
    const pattern = CacheKeys.testSession('*')
    const keys = await redis.keys(pattern)

    for (const key of keys) {
      const ttl = await redis.ttl(key)
      if (ttl <= 0) {
        await redis.del(key)
      }
    }
  }
}

// User session and performance caching
export class UserCacheService {
  // Cache user session data
  static async cacheUserSession(userId: string, sessionData: Record<string, any>): Promise<void> {
    const key = CacheKeys.userSession(userId)
    await redis.setex(key, CacheTTL.USER_SESSION, JSON.stringify(sessionData))
  }

  // Get cached user session
  static async getUserSession(userId: string): Promise<Record<string, any> | null> {
    const key = CacheKeys.userSession(userId)
    const cached = await redis.get(key)
    return cached ? JSON.parse(cached) : null
  }

  // Cache user progress
  static async cacheUserProgress(progress: UserProgress): Promise<void> {
    const key = CacheKeys.userProgress(
      progress.userId || progress.freeUserId || '',
      progress.topic
    )
    await redis.setex(key, CacheTTL.USER_PROGRESS, JSON.stringify(progress))
  }

  // Get cached user progress
  static async getUserProgress(userId: string, topic: string): Promise<UserProgress | null> {
    const key = CacheKeys.userProgress(userId, topic)
    const cached = await redis.get(key)
    return cached ? JSON.parse(cached) : null
  }

  // Cache user performance analytics
  static async cacheUserPerformance(
    userId: string,
    performance: Record<string, any>
  ): Promise<void> {
    const key = CacheKeys.userPerformance(userId)
    await redis.setex(key, CacheTTL.ANALYTICS, JSON.stringify(performance))
  }

  // Get cached user performance
  static async getUserPerformance(userId: string): Promise<Record<string, any> | null> {
    const key = CacheKeys.userPerformance(userId)
    const cached = await redis.get(key)
    return cached ? JSON.parse(cached) : null
  }

  // Cache user recommendations
  static async cacheUserRecommendations(
    userId: string,
    recommendations: Record<string, any>
  ): Promise<void> {
    const key = CacheKeys.userRecommendations(userId)
    await redis.setex(key, CacheTTL.USER_PROGRESS, JSON.stringify(recommendations))
  }

  // Get cached user recommendations
  static async getUserRecommendations(userId: string): Promise<Record<string, any> | null> {
    const key = CacheKeys.userRecommendations(userId)
    const cached = await redis.get(key)
    return cached ? JSON.parse(cached) : null
  }
}

// Real-time monitoring and analytics
export class AnalyticsCacheService {
  // Track online users
  static async addOnlineUser(userId: string): Promise<void> {
    const key = CacheKeys.onlineUsers()
    await redis.sadd(key, userId)
    await redis.expire(key, CacheTTL.REAL_TIME)
  }

  // Remove online user
  static async removeOnlineUser(userId: string): Promise<void> {
    const key = CacheKeys.onlineUsers()
    await redis.srem(key, userId)
  }

  // Get online users count
  static async getOnlineUsersCount(): Promise<number> {
    const key = CacheKeys.onlineUsers()
    return await redis.scard(key)
  }

  // Track active tests
  static async addActiveTest(sessionToken: string): Promise<void> {
    const key = CacheKeys.activeTests()
    await redis.sadd(key, sessionToken)
    await redis.expire(key, CacheTTL.REAL_TIME)
  }

  // Remove active test
  static async removeActiveTest(sessionToken: string): Promise<void> {
    const key = CacheKeys.activeTests()
    await redis.srem(key, sessionToken)
  }

  // Get active tests count
  static async getActiveTestsCount(): Promise<number> {
    const key = CacheKeys.activeTests()
    return await redis.scard(key)
  }

  // Cache global statistics
  static async cacheGlobalStats(stats: Record<string, any>): Promise<void> {
    const key = CacheKeys.globalStats()
    await redis.setex(key, CacheTTL.GLOBAL_STATS, JSON.stringify(stats))
  }

  // Get cached global statistics
  static async getGlobalStats(): Promise<Record<string, any> | null> {
    const key = CacheKeys.globalStats()
    const cached = await redis.get(key)
    return cached ? JSON.parse(cached) : null
  }

  // Cache leaderboard data
  static async cacheLeaderboard(type: string, data: any[]): Promise<void> {
    const key = CacheKeys.leaderboard(type)

    // Use Redis sorted sets for efficient leaderboard operations
    const pipeline = redis.pipeline()
    pipeline.del(key)

    data.forEach((entry, index) => {
      pipeline.zadd(key, index, JSON.stringify(entry))
    })

    pipeline.expire(key, CacheTTL.LEADERBOARD)
    await pipeline.exec()
  }

  // Get cached leaderboard
  static async getLeaderboard(type: string, limit: number = 10): Promise<any[]> {
    const key = CacheKeys.leaderboard(type)
    const cached = await redis.zrange(key, 0, limit - 1)
    return cached.map(item => JSON.parse(item))
  }
}

// Rate limiting service
export class RateLimitService {
  // Check and update rate limit for user
  static async checkUserRateLimit(
    userId: string,
    maxRequests: number = 100,
    windowSeconds: number = 3600
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const key = CacheKeys.rateLimitUser(userId)
    const current = await redis.incr(key)

    if (current === 1) {
      await redis.expire(key, windowSeconds)
    }

    const ttl = await redis.ttl(key)
    const resetTime = Date.now() + (ttl * 1000)

    return {
      allowed: current <= maxRequests,
      remaining: Math.max(0, maxRequests - current),
      resetTime
    }
  }

  // Check rate limit by IP
  static async checkIPRateLimit(
    ip: string,
    maxRequests: number = 1000,
    windowSeconds: number = 3600
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const key = CacheKeys.rateLimitIP(ip)
    const current = await redis.incr(key)

    if (current === 1) {
      await redis.expire(key, windowSeconds)
    }

    const ttl = await redis.ttl(key)
    const resetTime = Date.now() + (ttl * 1000)

    return {
      allowed: current <= maxRequests,
      remaining: Math.max(0, maxRequests - current),
      resetTime
    }
  }
}

// Health check and monitoring
export class CacheHealthService {
  // Check Redis connection health
  static async checkHealth(): Promise<{ status: string; latency: number; memory: any }> {
    const start = Date.now()

    try {
      await redis.ping()
      const latency = Date.now() - start

      const memory = await redis.memory('usage')

      return {
        status: 'healthy',
        latency,
        memory
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        latency: -1,
        memory: null
      }
    }
  }

  // Get cache statistics
  static async getCacheStats(): Promise<Record<string, any>> {
    const info = await redis.info('memory')
    const stats = await redis.info('stats')

    return {
      memory: info,
      stats,
      connectedClients: await redis.client('list')
    }
  }

  // Clear all cache (use with caution)
  static async clearAllCache(): Promise<void> {
    if (process.env.NODE_ENV === 'development') {
      await redis.flushdb()
    }
  }

  // Cleanup expired keys
  static async cleanupExpiredKeys(): Promise<number> {
    const keys = await redis.keys('*')
    let cleaned = 0

    for (const key of keys) {
      const ttl = await redis.ttl(key)
      if (ttl === -1) { // No expiration set
        continue
      }
      if (ttl <= 0) { // Expired
        await redis.del(key)
        cleaned++
      }
    }

    return cleaned
  }
}

// Export Redis instance for direct use if needed
export { redis }

// Export all services
export default {
  Question: QuestionCacheService,
  TestTemplate: TestTemplateCacheService,
  TestSession: TestSessionCacheService,
  User: UserCacheService,
  Analytics: AnalyticsCacheService,
  RateLimit: RateLimitService,
  Health: CacheHealthService,
}