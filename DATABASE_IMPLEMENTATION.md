# PostgreSQL Database with Redis Caching Implementation

## 🚀 Overview

This implementation provides a comprehensive PostgreSQL database with Redis caching system for the Cerebrum Biology Academy test generator platform. It's designed to handle 10,000+ concurrent users with high performance, scalability, and reliability.

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Database Schema](#database-schema)
3. [Redis Caching Strategy](#redis-caching-strategy)
4. [Service Layer Architecture](#service-layer-architecture)
5. [Performance Optimizations](#performance-optimizations)
6. [Setup Instructions](#setup-instructions)
7. [API Usage Examples](#api-usage-examples)
8. [Performance Considerations](#performance-considerations)
9. [Monitoring & Maintenance](#monitoring--maintenance)
10. [Troubleshooting](#troubleshooting)

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App  │    │  Redis Cache    │    │  PostgreSQL DB  │
│                 │    │                 │    │                 │
│ • Test Generator│◄──►│ • Question Cache│◄──►│ • User Data     │
│ • User Interface│    │ • Session Cache │    │ • Test Data     │
│ • API Routes    │    │ • Analytics     │    │ • Question Bank │
│                 │    │ • Real-time     │    │ • Analytics     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                       ▲                       ▲
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │ Service Layer   │
                    │                 │
                    │ • UserService   │
                    │ • TestService   │
                    │ • QuestionService│
                    │ • AnalyticsService│
                    └─────────────────┘
```

## 📊 Database Schema

### Core Models

#### Users & Authentication
- **User**: Basic user information for enrolled students
- **FreeUser**: Free tier users with enhanced analytics
- **Session**: User authentication sessions
- **UserProgress**: Topic-wise learning progress

#### Test Management
- **TestTemplate**: Reusable test configurations
- **TestSession**: Real-time test sessions with anti-cheating
- **TestAttempt**: Completed test records with analytics
- **TestAnalytics**: Detailed performance analytics

#### Question Bank
- **Question**: Question repository with rich metadata
- **QuestionBank**: Organized question collections
- **QuestionBankQuestion**: Question-bank relationships
- **UserQuestionResponse**: Individual question responses

#### Analytics & Performance
- **PerformanceReport**: Periodic performance summaries
- **AnalyticsEvent**: Event tracking for insights

### Key Features

- **Adaptive Testing**: Dynamic difficulty adjustment
- **Real-time Sessions**: Live test monitoring
- **Performance Tracking**: Comprehensive analytics
- **Anti-cheating**: Tab switching, fullscreen monitoring
- **Scalable Design**: Optimized for 10K+ concurrent users

## 🚀 Redis Caching Strategy

### Cache Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    Redis Caching Layers                     │
├─────────────────────────────────────────────────────────────┤
│ L1: Hot Data (TTL: 5-30min)                               │
│ • Active test sessions                                     │
│ • Real-time user progress                                  │
│ • Question answers (auto-save)                             │
├─────────────────────────────────────────────────────────────┤
│ L2: Warm Data (TTL: 1-6 hours)                           │
│ • Question banks                                           │
│ • Test templates                                           │
│ • User performance data                                    │
├─────────────────────────────────────────────────────────────┤
│ L3: Cold Data (TTL: 24 hours)                            │
│ • Global statistics                                        │
│ • Leaderboards                                            │
│ • Topic analytics                                         │
└─────────────────────────────────────────────────────────────┘
```

### Caching Strategies

1. **Question Caching**: Popular questions cached by topic/difficulty
2. **Test Session Caching**: Real-time session state for instant access
3. **User Performance Caching**: Progress data for dashboard rendering
4. **Analytics Caching**: Global stats and leaderboards
5. **Rate Limiting**: User and IP-based request limiting

### Cache Keys Pattern

```typescript
// Consistent naming pattern
question:{id}
test_template:{id}
test_session:{sessionToken}
user_progress:{userId}:{topic}
leaderboard:{type}
global_stats
```

## 🛠️ Service Layer Architecture

### UserService
- User registration and authentication
- Progress tracking and analytics
- Performance insights and recommendations
- Bulk operations for admin use

### TestService
- Test template management
- Real-time session handling
- Adaptive question selection
- Anti-cheating monitoring
- Results calculation and analytics

### QuestionService
- Question CRUD operations
- Question bank management
- Random question generation
- Performance analytics
- Quality control and verification

### AnalyticsService
- Global platform statistics
- User performance analysis
- Topic-wise analytics
- Leaderboard management
- Real-time monitoring

## ⚡ Performance Optimizations

### Database Level
```sql
-- Optimized indexes for common queries
CREATE INDEX CONCURRENTLY idx_questions_topic_difficulty ON questions(topic, difficulty);
CREATE INDEX CONCURRENTLY idx_test_sessions_token ON test_sessions(sessionToken);
CREATE INDEX CONCURRENTLY idx_user_responses_user_answered ON user_question_responses(userId, answeredAt);
```

### Application Level
- **Connection Pooling**: 5-20 connections per instance
- **Query Optimization**: Selective field loading, pagination
- **Batch Operations**: Bulk inserts and updates
- **Async Processing**: Non-blocking operations
- **Retry Logic**: Exponential backoff for transient errors

### Caching Level
- **Multi-tier Caching**: Hot, warm, and cold data
- **Cache Warming**: Pre-populate popular content
- **Smart Invalidation**: Targeted cache clearing
- **Compression**: Reduce memory usage
- **Monitoring**: Real-time cache hit rates

## 🚀 Setup Instructions

### 1. Prerequisites
```bash
# Install dependencies
npm install

# Install and start PostgreSQL
brew install postgresql
brew services start postgresql

# Install and start Redis
brew install redis
brew services start redis
```

### 2. Environment Configuration
```bash
# Copy environment template
cp .env.example .env.local

# Configure database URL
DATABASE_URL="postgresql://username:password@localhost:5432/cerebrum_biology_academy"

# Configure Redis
REDIS_HOST="localhost"
REDIS_PORT="6379"
```

### 3. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate:dev

# Seed the database
npm run db:seed

# Open Prisma Studio (optional)
npm run db:studio
```

### 4. Cache Setup
```bash
# Start Redis server
npm run redis:start

# Warm the cache
npm run cache:warm

# Verify setup
npm run health:check
```

## 🔧 API Usage Examples

### Test Generation
```typescript
import { TestGenerator } from '@/lib/testGenerator'

// Generate a new test
const test = await TestGenerator.generateTest({
  title: 'NEET Biology Mock Test',
  type: 'MOCK_TEST',
  topics: ['Cell Biology', 'Genetics'],
  difficulty: 'MEDIUM',
  questionCount: 45,
  timeLimit: 180,
  curriculum: 'NEET',
  grade: 'CLASS_12',
  subject: 'biology',
  freeUserId: 'user_123'
})

// Submit an answer
await TestGenerator.submitAnswer({
  sessionToken: test.sessionToken,
  questionId: 'question_456',
  selectedAnswer: 'Option B',
  timeSpent: 120,
  isMarkedForReview: false
})

// Get test progress
const progress = await TestGenerator.getTestProgress(test.sessionToken)

// Submit test and get results
const results = await TestGenerator.submitTest(test.sessionToken)
```

### User Management
```typescript
import { UserService } from '@/lib/database'

// Create a new user
const user = await UserService.createFreeUser({
  email: 'student@example.com',
  name: 'John Doe',
  grade: 'CLASS_12',
  curriculum: 'NEET',
  city: 'Delhi'
})

// Get performance metrics
const metrics = await UserService.calculateUserPerformanceMetrics(user.id)

// Update progress
await UserService.updateUserProgress({
  freeUserId: user.id,
  topic: 'Cell Biology',
  curriculum: 'NEET',
  grade: 'CLASS_12',
  totalQuestions: 20,
  correctAnswers: 16
})
```

### Question Management
```typescript
import { QuestionService } from '@/lib/database'

// Get random questions
const questions = await QuestionService.getRandomQuestions({
  count: 20,
  topics: ['Cell Biology'],
  difficulty: ['MEDIUM'],
  curriculum: 'NEET',
  grade: 'CLASS_12'
})

// Create a question
const question = await QuestionService.createQuestion({
  topic: 'Cell Biology',
  curriculum: 'NEET',
  grade: 'CLASS_12',
  subject: 'biology',
  type: 'MCQ',
  difficulty: 'MEDIUM',
  question: 'What is the powerhouse of the cell?',
  options: ['Nucleus', 'Mitochondria', 'Ribosome', 'ER'],
  correctAnswer: 'Mitochondria',
  explanation: 'Mitochondria produce ATP...',
  marks: 4,
  category: 'PRACTICE'
})
```

## 📊 Performance Considerations

### Scalability Targets
- **Concurrent Users**: 10,000+
- **Response Time**: <200ms for cached data, <1s for DB queries
- **Throughput**: 1000+ requests/second
- **Availability**: 99.9% uptime
- **Data Consistency**: Eventual consistency for analytics, strong consistency for test sessions

### Bottleneck Mitigation
1. **Database Connection Pool**: Prevents connection exhaustion
2. **Redis Clustering**: Horizontal cache scaling
3. **CDN Integration**: Static asset delivery
4. **Query Optimization**: Indexed queries and selective loading
5. **Async Processing**: Background jobs for heavy operations

### Resource Requirements
```yaml
# Minimum Production Setup
PostgreSQL:
  CPU: 4 cores
  RAM: 8GB
  Storage: 100GB SSD
  Connections: 100

Redis:
  CPU: 2 cores
  RAM: 4GB
  Storage: 20GB SSD

Application:
  CPU: 2 cores per instance
  RAM: 2GB per instance
  Instances: 3-5 (load balanced)
```

## 📈 Monitoring & Maintenance

### Health Checks
```bash
# System health check
npm run health:check

# Database performance
npm run db:studio

# Cache statistics
npm run redis:cli
> INFO stats
```

### Maintenance Tasks
```bash
# Daily
npm run cache:warm          # Warm cache with popular content
npm run health:check        # Verify system health

# Weekly
npm run db:test:reset       # Reset test data
npm run analytics:cleanup   # Clean old analytics

# Monthly
npm run db:migrate          # Apply any new migrations
npm run performance:analyze # Analyze query performance
```

### Monitoring Metrics
- Database query performance
- Cache hit rates
- API response times
- Error rates
- User engagement metrics
- System resource usage

## 🔍 Troubleshooting

### Common Issues

#### Database Connection Errors
```bash
# Check PostgreSQL status
brew services list | grep postgresql

# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Check connection pool
npm run health:check
```

#### Redis Connection Errors
```bash
# Check Redis status
brew services list | grep redis

# Test connection
redis-cli ping

# Check memory usage
redis-cli info memory
```

#### Performance Issues
```bash
# Check slow queries
npm run db:studio
# Navigate to query performance

# Check cache hit rates
redis-cli info stats

# Monitor active connections
npm run health:check
```

#### Cache Invalidation Issues
```bash
# Clear all cache
npm run redis:flush

# Warm cache again
npm run cache:warm

# Check specific keys
redis-cli keys "*question*"
```

### Debug Mode
```bash
# Enable debug logging
NODE_ENV=development npm run dev

# Database query logging
DATABASE_DEBUG=true npm run dev

# Cache operation logging
REDIS_DEBUG=true npm run dev
```

## 🎯 Next Steps

### Immediate Actions
1. Run the setup instructions
2. Execute health checks
3. Test core functionality
4. Monitor performance

### Future Enhancements
1. **Database Sharding**: Horizontal scaling for massive user bases
2. **Advanced Analytics**: ML-powered insights and predictions
3. **Real-time Collaboration**: Multi-user test sessions
4. **Global Distribution**: Multi-region deployment
5. **Advanced Security**: Enhanced anti-cheating measures

## 📞 Support

For technical support or questions about this implementation:

1. Check the health check results: `npm run health:check`
2. Review the logs for error details
3. Consult the troubleshooting section
4. Contact the development team with specific error messages

---

**Database Implementation Version**: 1.0.0
**Last Updated**: January 2025
**Compatibility**: Node.js 18+, PostgreSQL 13+, Redis 6+