# Redis Caching Implementation Guide

## Overview

This guide documents the comprehensive Redis caching system implemented for the Cerebrum Biology Academy platform. The caching layer is designed to handle 10,000+ concurrent users with graceful degradation when Redis is unavailable.

## Architecture

```
src/lib/cache/
├── redis.ts                      # Core Redis client with mock fallback
├── apiCache.ts                   # Next.js cache wrappers
├── CacheConfiguration.ts         # Configuration management
├── DistributedCacheManager.ts    # Distributed caching (optional)
├── SessionCacheManager.ts        # Session management (optional)
└── QueryCacheOptimizer.ts        # Query optimization (optional)
```

## Features

- **Graceful Degradation**: Automatic fallback to mock Redis when unavailable
- **Multi-Layer Caching**: Redis + Next.js cache for optimal performance
- **Type-Safe**: Full TypeScript support with Prisma types
- **Production-Ready**: Handles 10,000+ concurrent users
- **Monitoring**: Built-in health checks and analytics
- **Rate Limiting**: Included in caching layer

## Quick Start

### 1. Enable Redis

Update your `.env.local`:

```bash
# Enable Redis caching
REDIS_ENABLED=true

# Redis connection (choose one)
# Option A: Local Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# Option B: Upstash Redis (recommended for production)
REDIS_URL=redis://your-upstash-url:6379
REDIS_TOKEN=your-upstash-token
```

### 2. Start Redis Locally

```bash
# Install Redis (macOS)
brew install redis

# Start Redis
npm run redis:start

# Or manually:
redis-server

# Test connection
npm run redis:cli
> ping
PONG
```

### 3. Basic Usage in API Routes

```typescript
import { QuestionCacheService } from '@/lib/cache/redis'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const questionId = searchParams.get('id')

  // Try cache first
  const cached = await QuestionCacheService.getQuestion(questionId)
  if (cached) {
    return NextResponse.json({ question: cached, cached: true })
  }

  // Cache miss - fetch from database
  const question = await prisma.questions.findUnique({
    where: { id: questionId },
  })

  // Store in cache for future requests
  if (question) {
    await QuestionCacheService.cacheQuestion(question)
  }

  return NextResponse.json({ question, cached: false })
}
```

## Cache Services

### QuestionCacheService

Caches individual questions and question lists.

**Cache Individual Question**

```typescript
import { QuestionCacheService } from '@/lib/cache/redis'

// Store question
await QuestionCacheService.cacheQuestion(question)

// Retrieve question
const cached = await QuestionCacheService.getQuestion(questionId)

// Invalidate when question updated
await QuestionCacheService.invalidateQuestion(questionId)
```

**Cache Question Lists**

```typescript
// Cache questions by topic with pagination
await QuestionCacheService.cacheQuestionsByTopic(
  'Cell Biology',
  questions,
  'MEDIUM', // difficulty
  1 // page number
)

// Retrieve cached list
const questions = await QuestionCacheService.getQuestionsByTopic('Cell Biology', 'MEDIUM', 1)

// Cache random questions with filters
await QuestionCacheService.cacheRandomQuestions(questions, {
  subject: 'BIOLOGY',
  grade: '12',
  difficulty: 'HARD',
})

// Retrieve random questions
const random = await QuestionCacheService.getRandomQuestions({
  subject: 'BIOLOGY',
  grade: '12',
  difficulty: 'HARD',
})
```

**TTL**: 1 hour for individual questions, 30 minutes for lists

### TestTemplateCacheService

Caches test templates and popular tests.

**Basic Operations**

```typescript
import { TestTemplateCacheService } from '@/lib/cache/redis'

// Cache test template (stores by both ID and slug)
await TestTemplateCacheService.cacheTestTemplate(template)

// Retrieve by ID
const template = await TestTemplateCacheService.getTestTemplate(templateId)

// Retrieve by slug
const template = await TestTemplateCacheService.getTestTemplateBySlug('neet-2024-mock-1')
```

**Popular Tests**

```typescript
// Cache popular tests list
await TestTemplateCacheService.cachePopularTests(popularTests)

// Retrieve popular tests
const popular = await TestTemplateCacheService.getPopularTests()
```

**Filtered Lists**

```typescript
// Cache with filters
await TestTemplateCacheService.cacheTestTemplatesList(tests, {
  curriculum: 'NEET',
  grade: '12',
  difficulty: 'MIXED',
})

// Retrieve filtered list
const filtered = await TestTemplateCacheService.getTestTemplatesList({
  curriculum: 'NEET',
  grade: '12',
  difficulty: 'MIXED',
})
```

**TTL**: 1 hour for all test template data

### TestSessionCacheService

Critical for real-time test performance.

**Session Management**

```typescript
import { TestSessionCacheService } from '@/lib/cache/redis'

// Cache active test session
await TestSessionCacheService.cacheTestSession(session)

// Retrieve session
const session = await TestSessionCacheService.getTestSession(sessionToken)

// Get user's active session
const activeToken = await TestSessionCacheService.getUserActiveSession(userId)
```

**Real-Time Answer Saving**

```typescript
// Cache answers (auto-save)
await TestSessionCacheService.cacheSessionAnswers(sessionToken, {
  question1: { answer: 'A', timeSpent: 45 },
  question2: { answer: 'C', timeSpent: 60 },
})

// Retrieve answers
const answers = await TestSessionCacheService.getSessionAnswers(sessionToken)
```

**Progress Updates**

```typescript
// Atomic progress update
await TestSessionCacheService.updateSessionProgress(sessionToken, {
  currentQuestionIndex: 5,
  questionsAttempted: 5,
  timeRemaining: 3000,
})
```

**Cleanup**

```typescript
// Remove expired sessions
await TestSessionCacheService.cleanupExpiredSessions()
```

**TTL**: 30 minutes for active sessions

### UserCacheService

User session and performance caching.

**Session Data**

```typescript
import { UserCacheService } from '@/lib/cache/redis'

// Cache user session
await UserCacheService.cacheUserSession(userId, {
  role: 'STUDENT',
  subscription: 'PREMIUM',
  lastActive: new Date(),
})

// Retrieve session
const session = await UserCacheService.getUserSession(userId)
```

**Progress Tracking**

```typescript
// Cache user progress
await UserCacheService.cacheUserProgress(progressRecord)

// Retrieve progress
const progress = await UserCacheService.getUserProgress(userId, 'Cell Biology')
```

**Performance Analytics**

```typescript
// Cache performance data
await UserCacheService.cacheUserPerformance(userId, {
  averageScore: 85,
  testsCompleted: 42,
  totalTimeSpent: 12600,
  strongTopics: ['Genetics', 'Ecology'],
  weakTopics: ['Botany'],
})

// Retrieve performance
const performance = await UserCacheService.getUserPerformance(userId)
```

**Recommendations**

```typescript
// Cache AI recommendations
await UserCacheService.cacheUserRecommendations(userId, {
  nextTopics: ['Plant Physiology', 'Reproduction'],
  suggestedTests: ['test-123', 'test-456'],
  studyPlan: {...},
})

// Retrieve recommendations
const recommendations = await UserCacheService.getUserRecommendations(userId)
```

**TTL**:

- User session: 24 hours
- Progress: 5 minutes
- Performance: 1 hour
- Recommendations: 5 minutes

### AnalyticsCacheService

Real-time monitoring and leaderboards.

**Online Users**

```typescript
import { AnalyticsCacheService } from '@/lib/cache/redis'

// Track online user
await AnalyticsCacheService.addOnlineUser(userId)

// Remove offline user
await AnalyticsCacheService.removeOnlineUser(userId)

// Get count
const count = await AnalyticsCacheService.getOnlineUsersCount()
```

**Active Tests**

```typescript
// Track active test
await AnalyticsCacheService.addActiveTest(sessionToken)

// Remove completed test
await AnalyticsCacheService.removeActiveTest(sessionToken)

// Get active count
const activeTests = await AnalyticsCacheService.getActiveTestsCount()
```

**Global Statistics**

```typescript
// Cache global stats
await AnalyticsCacheService.cacheGlobalStats({
  totalUsers: 50000,
  testsCompleted: 250000,
  averageScore: 72.5,
  topPerformers: [...],
})

// Retrieve stats
const stats = await AnalyticsCacheService.getGlobalStats()
```

**Leaderboards**

```typescript
// Cache leaderboard (uses Redis sorted sets)
await AnalyticsCacheService.cacheLeaderboard('weekly', [
  { userId: 'user1', score: 950, rank: 1 },
  { userId: 'user2', score: 920, rank: 2 },
  { userId: 'user3', score: 890, rank: 3 },
])

// Retrieve top 10
const top10 = await AnalyticsCacheService.getLeaderboard('weekly', 10)
```

**TTL**:

- Online users: 1 minute
- Active tests: 1 minute
- Global stats: 5 minutes
- Leaderboards: 10 minutes

### RateLimitService

Built-in rate limiting using Redis.

**User Rate Limiting**

```typescript
import { RateLimitService } from '@/lib/cache/redis'

// Check user rate limit (100 requests per hour default)
const result = await RateLimitService.checkUserRateLimit(userId, 100, 3600)

if (!result.allowed) {
  return NextResponse.json(
    {
      error: `Rate limit exceeded. Try again in ${Math.ceil((result.resetTime - Date.now()) / 1000)}s`,
    },
    { status: 429 }
  )
}

// Process request
```

**IP Rate Limiting**

```typescript
// Check IP rate limit (1000 requests per hour default)
const clientIP = request.headers.get('x-forwarded-for') || 'unknown'
const result = await RateLimitService.checkIPRateLimit(clientIP, 1000, 3600)

if (!result.allowed) {
  return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
}
```

**Response Headers**

```typescript
// Add rate limit info to response headers
const response = NextResponse.json({ data })
response.headers.set('X-RateLimit-Remaining', result.remaining.toString())
response.headers.set('X-RateLimit-Reset', result.resetTime.toString())
return response
```

### CacheHealthService

Monitoring and maintenance.

**Health Check**

```typescript
import { CacheHealthService } from '@/lib/cache/redis'

// Check Redis health
const health = await CacheHealthService.checkHealth()

console.log(health)
// {
//   status: 'healthy',
//   latency: 2, // ms
//   memory: {...}
// }
```

**Cache Statistics**

```typescript
// Get detailed cache stats
const stats = await CacheHealthService.getCacheStats()

console.log(stats)
// {
//   memory: '...',
//   stats: '...',
//   connectedClients: [...]
// }
```

**Maintenance**

```typescript
// Clear all cache (development only)
await CacheHealthService.clearAllCache()

// Cleanup expired keys
const cleaned = await CacheHealthService.cleanupExpiredKeys()
console.log(`Cleaned ${cleaned} expired keys`)
```

## Next.js Cache Integration

Combine Redis with Next.js cache for optimal performance.

**Basic Usage**

```typescript
import { createCachedQuery, cacheStrategies } from '@/lib/cache/apiCache'
import prisma from '@/lib/prisma'

// Create cached query function
const getCourses = createCachedQuery(
  async () => {
    return await prisma.courses.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    })
  },
  cacheStrategies.static // 1 hour revalidation
)

// Use in API route or Server Component
export async function GET() {
  const courses = await getCourses()
  return NextResponse.json({ courses })
}
```

**Available Strategies**

```typescript
import { cacheStrategies } from '@/lib/cache/apiCache'

// Dashboard data - 5 minutes
cacheStrategies.dashboard

// Test data - 1 minute (high freshness)
cacheStrategies.test

// Progress data - 3 minutes
cacheStrategies.progress

// Static content - 1 hour
cacheStrategies.static

// Analytics - 5 minutes
cacheStrategies.analytics

// User profile - 2 minutes
cacheStrategies.profile

// Leaderboard - 30 seconds (competitive)
cacheStrategies.leaderboard
```

**Cache Invalidation**

```typescript
import {
  invalidateCache,
  invalidateDashboardCache,
  invalidateTestCache,
} from '@/lib/cache/apiCache'

// Invalidate specific tags
await invalidateCache(['dashboard', 'analytics'])

// Convenience functions
await invalidateDashboardCache() // dashboard + analytics + progress + profile
await invalidateTestCache() // test + progress + analytics

// Path-based invalidation
import { revalidatePath } from '@/lib/cache/apiCache'
await revalidatePath('/dashboard/student')
```

## Implementation Patterns

### Pattern 1: Cache-Aside (Lazy Loading)

Most common pattern - check cache, fetch from DB on miss, then cache result.

```typescript
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const topic = searchParams.get('topic')

  // 1. Check cache
  const cached = await QuestionCacheService.getQuestionsByTopic(topic)
  if (cached) {
    return NextResponse.json({ questions: cached, cached: true })
  }

  // 2. Cache miss - fetch from database
  const questions = await prisma.questions.findMany({
    where: { topic },
    orderBy: { difficulty: 'asc' },
  })

  // 3. Store in cache
  await QuestionCacheService.cacheQuestionsByTopic(topic, questions)

  return NextResponse.json({ questions, cached: false })
}
```

### Pattern 2: Write-Through Cache

Update both cache and database on write operations.

```typescript
export async function POST(request: NextRequest) {
  const body = await request.json()

  // 1. Validate input
  const validated = questionSchema.parse(body)

  // 2. Write to database
  const question = await prisma.questions.create({
    data: validated,
  })

  // 3. Update cache immediately
  await QuestionCacheService.cacheQuestion(question)

  // 4. Invalidate related caches
  await QuestionCacheService.invalidateQuestion(question.id)

  return NextResponse.json({ question }, { status: 201 })
}
```

### Pattern 3: Cache Warming

Pre-populate cache with frequently accessed data.

```typescript
// scripts/warm-cache.ts
import { QuestionCacheService, TestTemplateCacheService } from '@/lib/cache/redis'
import prisma from '@/lib/prisma'

async function warmCache() {
  console.log('🔥 Warming cache...')

  // Warm popular questions
  const popularTopics = ['Cell Biology', 'Genetics', 'Ecology']
  for (const topic of popularTopics) {
    const questions = await prisma.questions.findMany({
      where: { topic },
      take: 50,
    })
    await QuestionCacheService.cacheQuestionsByTopic(topic, questions)
  }

  // Warm popular tests
  const popularTests = await prisma.test_templates.findMany({
    orderBy: { sessionsCount: 'desc' },
    take: 10,
  })
  await TestTemplateCacheService.cachePopularTests(popularTests)

  console.log('✅ Cache warmed successfully')
}

warmCache()
```

**Run with**:

```bash
npm run cache:warm
```

### Pattern 4: Dual-Layer Caching

Combine Redis + Next.js cache for best performance.

```typescript
import { createCachedQuery, cacheStrategies } from '@/lib/cache/apiCache'
import { QuestionCacheService } from '@/lib/cache/redis'

// Layer 1: Next.js cache (in-memory, fast)
const getCachedQuestions = createCachedQuery(async (topic: string) => {
  // Layer 2: Redis cache (distributed, shared)
  const cached = await QuestionCacheService.getQuestionsByTopic(topic)
  if (cached) return cached

  // Layer 3: Database (slowest, authoritative)
  const questions = await prisma.questions.findMany({ where: { topic } })

  // Populate Redis cache
  await QuestionCacheService.cacheQuestionsByTopic(topic, questions)

  return questions
}, cacheStrategies.static)

export async function GET(request: NextRequest) {
  const topic = request.nextUrl.searchParams.get('topic')
  const questions = await getCachedQuestions(topic)
  return NextResponse.json({ questions })
}
```

### Pattern 5: Optimistic Updates

Update cache immediately, sync to database asynchronously.

```typescript
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { sessionToken, answers } = body

  // 1. Update cache immediately for real-time feedback
  await TestSessionCacheService.cacheSessionAnswers(sessionToken, answers)

  // 2. Async database update (fire and forget)
  prisma.test_session_answers
    .upsert({
      where: { sessionToken },
      update: { answers },
      create: { sessionToken, answers },
    })
    .catch((err) => console.error('Failed to persist answers:', err))

  // 3. Return immediately
  return NextResponse.json({ success: true })
}
```

## API Route Integration Examples

### Example 1: Questions API

```typescript
// src/app/api/questions/route.ts
import { QuestionCacheService } from '@/lib/cache/redis'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'

const querySchema = z.object({
  topic: z.string().optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),
  page: z.coerce.number().positive().default(1),
  limit: z.coerce.number().positive().max(100).default(20),
})

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const query = querySchema.parse(Object.fromEntries(searchParams))

  // Try cache first
  if (query.topic) {
    const cached = await QuestionCacheService.getQuestionsByTopic(
      query.topic,
      query.difficulty,
      query.page
    )

    if (cached) {
      return NextResponse.json({ questions: cached, cached: true })
    }
  }

  // Fetch from database
  const questions = await prisma.questions.findMany({
    where: {
      topic: query.topic,
      difficulty: query.difficulty,
    },
    skip: (query.page - 1) * query.limit,
    take: query.limit,
    orderBy: { createdAt: 'desc' },
  })

  // Cache for future requests
  if (query.topic) {
    await QuestionCacheService.cacheQuestionsByTopic(
      query.topic,
      questions,
      query.difficulty,
      query.page
    )
  }

  return NextResponse.json({ questions, cached: false })
}
```

### Example 2: Test Sessions API

```typescript
// src/app/api/test-sessions/[token]/route.ts
import { TestSessionCacheService } from '@/lib/cache/redis'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: { token: string } }) {
  const { token } = params

  // Try cache first (critical for real-time performance)
  const cached = await TestSessionCacheService.getTestSession(token)
  if (cached) {
    return NextResponse.json({ session: cached, cached: true })
  }

  // Fetch from database
  const session = await prisma.test_sessions.findUnique({
    where: { sessionToken: token },
    include: {
      test_template: true,
      answers: true,
    },
  })

  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  // Cache active session
  if (session.status === 'IN_PROGRESS') {
    await TestSessionCacheService.cacheTestSession(session)
  }

  return NextResponse.json({ session, cached: false })
}

export async function PATCH(request: NextRequest, { params }: { params: { token: string } }) {
  const { token } = params
  const body = await request.json()

  // Update cache immediately (optimistic)
  await TestSessionCacheService.updateSessionProgress(token, body)

  // Update database
  const updated = await prisma.test_sessions.update({
    where: { sessionToken: token },
    data: body,
  })

  return NextResponse.json({ session: updated })
}
```

### Example 3: User Progress API

```typescript
// src/app/api/progress/[userId]/route.ts
import { UserCacheService } from '@/lib/cache/redis'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params
  const { searchParams } = request.nextUrl
  const topic = searchParams.get('topic')

  if (!topic) {
    // Get all progress for user
    const allProgress = await prisma.user_progress.findMany({
      where: { userId },
    })
    return NextResponse.json({ progress: allProgress })
  }

  // Try cache for specific topic
  const cached = await UserCacheService.getUserProgress(userId, topic)
  if (cached) {
    return NextResponse.json({ progress: cached, cached: true })
  }

  // Fetch from database
  const progress = await prisma.user_progress.findFirst({
    where: { userId, topic },
  })

  // Cache result
  if (progress) {
    await UserCacheService.cacheUserProgress(progress)
  }

  return NextResponse.json({ progress, cached: false })
}
```

### Example 4: Analytics API with Caching

```typescript
// src/app/api/analytics/stats/route.ts
import { AnalyticsCacheService } from '@/lib/cache/redis'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  // Try cache first
  const cached = await AnalyticsCacheService.getGlobalStats()
  if (cached) {
    return NextResponse.json({ stats: cached, cached: true })
  }

  // Expensive aggregation queries
  const [totalUsers, testsCompleted, avgScore] = await Promise.all([
    prisma.users.count(),
    prisma.test_sessions.count({ where: { status: 'COMPLETED' } }),
    prisma.test_sessions.aggregate({
      where: { status: 'COMPLETED' },
      _avg: { score: true },
    }),
  ])

  const stats = {
    totalUsers,
    testsCompleted,
    averageScore: avgScore._avg.score || 0,
    timestamp: new Date(),
  }

  // Cache for 5 minutes
  await AnalyticsCacheService.cacheGlobalStats(stats)

  return NextResponse.json({ stats, cached: false })
}
```

### Example 5: Rate-Limited API

```typescript
// src/app/api/ai/chat/route.ts
import { RateLimitService } from '@/lib/cache/redis'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const userId = request.headers.get('x-user-id')

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check rate limit: 10 AI requests per hour for free users
  const rateLimit = await RateLimitService.checkUserRateLimit(userId, 10, 3600)

  if (!rateLimit.allowed) {
    const resetIn = Math.ceil((rateLimit.resetTime - Date.now()) / 1000 / 60)
    return NextResponse.json(
      { error: `Rate limit exceeded. Try again in ${resetIn} minutes.` },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimit.resetTime.toString(),
        },
      }
    )
  }

  // Process AI request
  const body = await request.json()
  const response = await processAIRequest(body)

  // Return with rate limit headers
  return NextResponse.json(response, {
    headers: {
      'X-RateLimit-Remaining': rateLimit.remaining.toString(),
      'X-RateLimit-Reset': rateLimit.resetTime.toString(),
    },
  })
}
```

## Performance Monitoring

### Health Check Endpoint

```typescript
// src/app/api/health/cache/route.ts
import { CacheHealthService } from '@/lib/cache/redis'
import { NextResponse } from 'next/server'

export async function GET() {
  const health = await CacheHealthService.checkHealth()
  const stats = await CacheHealthService.getCacheStats()

  return NextResponse.json({
    health,
    stats,
    timestamp: new Date(),
  })
}
```

**Access**: `GET /api/health/cache`

**Response**:

```json
{
  "health": {
    "status": "healthy",
    "latency": 2,
    "memory": {...}
  },
  "stats": {
    "memory": "...",
    "stats": "...",
    "connectedClients": [...]
  },
  "timestamp": "2025-11-17T12:00:00Z"
}
```

### Cache Performance Metrics

Track cache hit/miss rates:

```typescript
let cacheHits = 0
let cacheMisses = 0

export async function GET(request: NextRequest) {
  const cached = await QuestionCacheService.getQuestion(id)

  if (cached) {
    cacheHits++
    console.log(`Cache hit rate: ${((cacheHits / (cacheHits + cacheMisses)) * 100).toFixed(2)}%`)
    return NextResponse.json({ question: cached })
  }

  cacheMisses++
  // ... fetch from database
}
```

## Production Deployment

### Upstash Redis (Recommended)

1. **Create Upstash Redis database**:
   - Visit [upstash.com](https://upstash.com/)
   - Create new Redis database
   - Select region closest to your Vercel deployment

2. **Configure environment variables**:

```bash
# Vercel environment variables
REDIS_ENABLED=true
REDIS_URL=redis://your-upstash-url:6379
REDIS_TOKEN=your-upstash-token
```

3. **Deploy to Vercel**:

```bash
vercel env pull
vercel deploy --prod
```

### Redis Cloud

Alternatively, use Redis Cloud:

```bash
REDIS_ENABLED=true
REDIS_URL=redis://username:password@host:port
```

### Monitoring

Add Sentry integration for cache errors:

```typescript
import * as Sentry from '@sentry/nextjs'

try {
  await QuestionCacheService.cacheQuestion(question)
} catch (error) {
  Sentry.captureException(error, {
    tags: { service: 'redis-cache', operation: 'cacheQuestion' },
    extra: { questionId: question.id },
  })
  // Continue without cache - graceful degradation
}
```

## Troubleshooting

### Issue: Redis connection timeout

**Cause**: Redis server not running or incorrect configuration

**Solution**:

```bash
# Check if Redis is running
redis-cli ping

# Start Redis
npm run redis:start

# Check environment variables
echo $REDIS_HOST
echo $REDIS_PORT
```

### Issue: Cache not invalidating

**Cause**: Invalidation not called after data mutations

**Solution**: Always invalidate cache after updates

```typescript
// ❌ Bad - cache never invalidated
await prisma.questions.update({ where: { id }, data: updated })

// ✅ Good - invalidate after update
await prisma.questions.update({ where: { id }, data: updated })
await QuestionCacheService.invalidateQuestion(id)
```

### Issue: Memory usage too high

**Cause**: Too many keys or large values

**Solution**:

1. Reduce TTL values
2. Implement LRU eviction
3. Monitor with `CacheHealthService.getCacheStats()`

```typescript
// Configure Redis eviction policy
// In redis.conf or Upstash settings:
maxmemory 500mb
maxmemory-policy allkeys-lru
```

### Issue: Stale data in cache

**Cause**: TTL too high or missing invalidation

**Solution**: Reduce TTL or add invalidation triggers

```typescript
// Reduce TTL for frequently changing data
export const CacheTTL = {
  REAL_TIME: 60, // 1 minute instead of 5
  USER_PROGRESS: 180, // 3 minutes instead of 5
}
```

### Issue: Cache always misses

**Cause**: REDIS_ENABLED not set or Redis client misconfigured

**Solution**:

```bash
# Enable Redis in environment
export REDIS_ENABLED=true

# Or check .env.local
cat .env.local | grep REDIS_ENABLED
```

## Best Practices

1. **Always use try-catch for cache operations**

   ```typescript
   try {
     await QuestionCacheService.cacheQuestion(question)
   } catch (error) {
     console.error('Cache error:', error)
     // Continue without cache
   }
   ```

2. **Set appropriate TTLs based on data freshness needs**
   - Real-time data: 30-60 seconds
   - User data: 2-5 minutes
   - Static content: 1 hour
   - Rarely changing: 24 hours

3. **Invalidate cache after all write operations**

   ```typescript
   await prisma.questions.create({ data: newQuestion })
   await QuestionCacheService.invalidateQuestion(newQuestion.id)
   ```

4. **Use cache warming for frequently accessed data**

   ```bash
   npm run cache:warm
   ```

5. **Monitor cache hit rates and adjust strategies**

   ```typescript
   // Log cache performance
   console.log(`Hit rate: ${hitRate}%`)
   // Aim for >80% hit rate on popular endpoints
   ```

6. **Combine Redis + Next.js cache for optimal performance**

   ```typescript
   // Use both layers
   const data = await createCachedQuery(async () => {
     const cached = await RedisCache.get(key)
     if (cached) return cached

     const fresh = await fetchFromDB()
     await RedisCache.set(key, fresh)
     return fresh
   }, cacheStrategies.static)
   ```

7. **Use Redis for distributed caching across serverless functions**
   - Next.js cache is per-instance
   - Redis is shared across all instances
   - Critical for consistent state in serverless

8. **Implement gradual rollout**

   ```typescript
   // Feature flag for cache
   const CACHE_ENABLED = process.env.FEATURE_CACHE === 'true'

   if (CACHE_ENABLED) {
     const cached = await QuestionCacheService.getQuestion(id)
     if (cached) return cached
   }

   // Fallback to database
   return await prisma.questions.findUnique({ where: { id } })
   ```

## Maintenance

### Regular Cleanup

Create a cron job for cache maintenance:

```typescript
// src/app/api/cron/cache-cleanup/route.ts
import { CacheHealthService, TestSessionCacheService } from '@/lib/cache/redis'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Cleanup expired keys
  const cleaned = await CacheHealthService.cleanupExpiredKeys()

  // Cleanup expired test sessions
  await TestSessionCacheService.cleanupExpiredSessions()

  return NextResponse.json({
    success: true,
    keysRemoved: cleaned,
    timestamp: new Date(),
  })
}
```

**Schedule in Vercel**:

```json
{
  "crons": [
    {
      "path": "/api/cron/cache-cleanup",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

## Resources

- [Redis Documentation](https://redis.io/docs/)
- [Upstash Redis](https://upstash.com/docs/redis)
- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)
- [ioredis API](https://github.com/redis/ioredis)
