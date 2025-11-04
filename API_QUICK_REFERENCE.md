# API Routes Quick Reference Guide

## Mock Data Routes - PRIORITY MIGRATION LIST

### 1. Calendar/Faculty Availability (URGENT)

**File:** `/src/app/api/calendar/availability/route.ts`  
**Lines:** 5-104  
**Data:** `facultyAvailabilities` array with 2 hardcoded faculty

**Current Implementation:**

```typescript
const facultyAvailabilities: FacultyAvailability[] = [
  { facultyId: 'faculty_1', facultyName: 'Dr. Priya Sharma', ... },
  { facultyId: 'faculty_2', facultyName: 'Prof. Rajesh Kumar', ... }
]
```

**Action Required:**

- Create `FacultyAvailability` table in Prisma schema
- Add fields: facultyId, facultyName, email, phone, subjects, grades, weeklySchedule, dateOverrides, preferences
- Replace hardcoded array with Prisma queries
- Fields needed for full implementation: maxHoursPerDay, maxStudentsPerDemo, onlineClassesEnabled, offlineClassesEnabled

---

### 2. Analytics Dashboard (HIGH PRIORITY)

**File:** `/src/app/api/analytics/dashboard/route.ts`  
**Lines:** 6-87

**Mock Functions:**

- `generateMockDashboardData()` - Returns hardcoded stats
- `generateMockRealTimeData()` - Simulates real-time users

**Current Mock Data:**

- totalUsers: 15847
- activeUsers: 1243
- topPages: 5 hardcoded pages
- topCourses: 4 courses with mock revenue

**Action Required:**

- Use actual counts from database:
  - `prisma.user.count()`
  - `prisma.testSession.count({ where: { status: 'IN_PROGRESS' } })`
  - `prisma.analyticsEvent.findMany()` for real page views
- Calculate real-time metrics from recent events
- Keep the Student/Teacher/Admin view logic (lines 195-442 are correctly implemented)

---

### 3. Test Security Configuration (MEDIUM)

**File:** `/src/app/api/test/security/route.ts`

**Current:** Returns hardcoded anti-cheat settings  
**Action Required:**

- Move settings to database or environment variables
- Create configuration table for customizable rules
- Fields: enableScreenShare, enableAltTab, enableDevTools, etc.

---

### 4. Cache Demo (DEMONSTRATION ONLY - LOW PRIORITY)

**File:** `/src/app/api/cache/demo/route.ts`

**Status:** This is intentionally a demo route - no migration needed  
**Use:** For testing cache performance with sample data

---

## Database Integration Checklist

### Already Implemented (No Changes Needed)

- [x] Authentication (signin, register, OTP verification)
- [x] User profiles (read, update, enrollment tracking)
- [x] Test management (create, submit, score)
- [x] Questions (CRUD, filtering, categorization)
- [x] Payments (Razorpay integration)
- [x] Demo bookings (creation, management, rescheduling)
- [x] Analytics (event tracking, user metrics, test analytics)
- [x] Content delivery (study materials, uploads)
- [x] Referral codes (validation, redemption)
- [x] Admin features (LMS, marketing, CI/CD)

### Need Prisma Schema Updates

```prisma
// Add missing models if not present:

model FacultyAvailability {
  id String @id @default(cuid())
  facultyId String @unique
  facultyName String
  email String
  phone String
  subjects String[] // Array of subject names
  grades String[] // Array of grade levels
  weeklySchedule Json // { monday: [...], tuesday: [...] }
  dateOverrides Json // { "2025-01-20": {...} }
  preferences Json // { maxHoursPerDay: 8, ... }
  isActive Boolean @default(true)
  lastUpdated DateTime @updatedAt
  createdAt DateTime @default(now())
}

model SystemConfiguration {
  id String @id @default("default")
  antiCheatSettings Json
  analyticsSettings Json
  paymentSettings Json
  notificationSettings Json
  updatedAt DateTime @updatedAt
  updatedBy String?
}
```

---

## Real Database Routes - Data Flow Reference

### Authentication Flow

```
POST /api/auth/register
├─ Prisma: Check user.email uniqueness
├─ Prisma: Hash password
└─ Prisma: Create user record

POST /api/auth/signin
├─ Prisma: Find user by email
├─ Verify password hash
└─ Create session token
```

### Test Execution Flow

```
POST /api/test/create
├─ Prisma: Fetch questions from db
│  └─ WHERE topic IN [...], difficulty = ?, isActive = true
├─ Prisma: Create testSession record
├─ Prisma: Create questionBank record
└─ Prisma: Map questions to bank

POST /api/test/[id]/answer
├─ Prisma: Record userQuestionResponse
├─ Calculate marks (correct/incorrect)
└─ Update testSession.questionsAnswered

POST /api/test/[id]/submit
├─ Finalize test status
├─ Calculate totalScore & percentage
├─ Create testAnalytics record
└─ Update leaderboard (if applicable)
```

### Payment Flow

```
POST /api/payment/create-order
├─ Prisma: Verify demoBooking exists
├─ Razorpay: Create order
├─ Prisma: Store razorpayOrderId
└─ Return to client

POST /api/payments/webhook
├─ Verify Razorpay signature
├─ Prisma: Update demoBooking.paymentStatus
├─ Create enrollment record
└─ Send confirmation
```

---

## Authentication & Authorization Patterns

### Middleware Stack

```typescript
// Protected routes use:
withAuth()          // Validates session/token
  ↓
withRateLimit()     // Prevents abuse
  ↓
withValidation()    // Zod schema validation
  ↓
Route handler       // Business logic
```

### Role-Based Access

```
ADMIN:    Full access to all resources
TEACHER:  Manage students in grade, view analytics
STUDENT:  Access own data, take tests, view results
PARENT:   View child's progress
```

### Headers Required

```
Authorization: Bearer <token> or Cookie: session=<token>
Content-Type: application/json
X-CSRF-Token: (if form data)
```

---

## Rate Limiting Patterns

### Implemented Rate Limits

| Endpoint             | Limit        | Window         | Implementation            |
| -------------------- | ------------ | -------------- | ------------------------- |
| `/api/auth/signin`   | 5 attempts   | Per email + IP | In-memory (AuthRateLimit) |
| `/api/auth/send-otp` | 5 OTPs       | Per hour       | Prisma otpVerification    |
| `/api/auth/send-otp` | 2 OTPs       | Per 5 min      | Query recent OTPs         |
| `/api/test/create`   | 10 tests     | Per hour       | withRateLimit middleware  |
| `/api/demo-booking`  | 5 bookings   | Per 15 min     | Map<IP, count> in memory  |
| `/api/questions`     | 200 requests | Per hour       | withRateLimit middleware  |

### Add Redis Rate Limiting (Recommended)

```typescript
// Current: In-memory rate limiting
// Issue: Resets on server restart
// Solution: Use Redis for distributed rate limiting

const rateLimitKey = `ratelimit:${endpoint}:${userId}:${window}`
const count = await redis.incr(rateLimitKey)
await redis.expire(rateLimitKey, windowDuration)
```

---

## Database Query Optimization Needs

### Missing Indexes (Add to Prisma)

```prisma
model User {
  id String @id
  email String @unique // Already indexed
  phone String @unique // Needed for OTP lookups

  @@index([createdAt]) // For user growth analytics
  @@index([role])      // For role-based queries
}

model TestSession {
  id String @id
  userId String
  status String

  @@index([userId])           // For user's test history
  @@index([status])           // For filtering by status
  @@index([createdAt])        // For date-range queries
  @@index([userId, createdAt]) // Composite for performance
}

model Question {
  id String @id
  topic String
  difficulty String

  @@index([topic])           // For topic-wise filtering
  @@index([difficulty])      // For difficulty filtering
  @@index([topic, difficulty]) // Composite for queries
  @@index([isActive])        // For listing active questions
}

model DemoBooking {
  id String @id
  createdAt DateTime
  status String

  @@index([createdAt])  // For recent bookings
  @@index([status])     // For status filtering
}

model AnalyticsEvent {
  id String @id
  userId String
  eventType String
  createdAt DateTime

  @@index([userId])        // For user event history
  @@index([eventType])     // For event type filtering
  @@index([createdAt])     // For time-range queries
  @@index([userId, createdAt]) // For user's recent events
}
```

---

## External Service Integration Points

### Razorpay (Payment)

**Endpoints Using:**

- `/api/payment/create-order` - Creates payment order
- `/api/payments/webhook` - Receives payment status

**Configuration Needed:**

```
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_secret
```

### MSG91 (SMS & WhatsApp)

**Endpoints Using:**

- `/api/auth/send-otp` - Sends OTP via SMS & WhatsApp

**Configuration Needed:**

```
MSG91_AUTH_KEY=your_auth_key
MSG91_SMS_TEMPLATE_ID=your_template
MSG91_WHATSAPP_TEMPLATE_ID=your_template
MSG91_WHATSAPP_NUMBER=your_number
MSG91_SENDER_ID=CRBMBIO
```

### Claude AI (Content Generation)

**Endpoints Using:**

- `/api/ai/generate-test` - AI test generation
- `/api/ai/test/submit` - AI-powered feedback
- `/api/claudechat/*` - Image analysis, voice explanation

**Configuration Needed:**

```
ANTHROPIC_API_KEY=your_api_key
```

### Vercel Blob (File Storage)

**Endpoints Using:**

- `/api/admin/lms/upload` - Upload study materials
- `/api/student/materials/[id]/download` - Download files

**Configuration Needed:**

```
BLOB_READ_WRITE_TOKEN=your_token
```

---

## Error Handling Standards

### Status Codes Used

```
200 - Success
201 - Created
204 - No content
400 - Bad request (validation error)
401 - Unauthorized (missing/invalid auth)
403 - Forbidden (insufficient permissions)
404 - Not found
429 - Rate limit exceeded
500 - Internal server error
503 - Service unavailable
```

### Error Response Format

```json
{
  "error": "User-facing message",
  "code": "ERROR_CODE",
  "details": "Optional technical details",
  "status": 400
}
```

### Logging Pattern

```typescript
logger.info('Action completed', {
  userId,
  action,
  timestamp,
  metadata,
})

logger.error('Action failed', error)
```

---

## Testing the API

### Authentication Test

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123",
    "phone": "9876543210",
    "role": "student"
  }'

# Signin
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

### Protected Route Test

```bash
# Get profile (requires token from signin)
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer <token>"
```

### Test Creation

```bash
curl -X POST http://localhost:3000/api/test/create \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "topics": ["Cell Biology", "Genetics"],
    "difficulty": "MEDIUM",
    "questionCount": 10
  }'
```

---

## Key Files to Understand

### Authentication

- `/lib/auth/config.ts` - Auth utilities & middleware
- `/lib/auth/middleware.ts` - withAuth middleware

### Database

- `/lib/prisma.ts` - Prisma client instance
- `/prisma/schema.prisma` - Database schema

### Validation

- Individual route files - Zod schemas at top

### Types

- `/lib/types/` - TypeScript type definitions

---

## Performance Tips

1. **Use Prisma select()** to only fetch needed fields
2. **Add database indexes** for frequently filtered columns
3. **Implement caching** for static data (courses, questions)
4. **Use pagination** for large result sets
5. **Batch database operations** with transactions
6. **Monitor slow queries** with Prisma query logging

---

## Next Steps for Development

1. **Migrate mock data to database** (see prioritized list above)
2. **Add database indexes** for performance
3. **Implement Redis caching** for rate limiting & session
4. **Add comprehensive error handling** with proper codes
5. **Set up API monitoring** for production
6. **Create API documentation** with OpenAPI/Swagger
