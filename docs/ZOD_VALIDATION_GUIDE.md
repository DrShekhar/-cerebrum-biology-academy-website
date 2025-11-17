# Zod Validation Guide

## Overview

This guide documents the centralized Zod validation system used across the Cerebrum Biology Academy platform. All API routes should use these reusable schemas for consistent validation and better type safety.

## Architecture

```
src/lib/validation/
├── index.ts           # Main export file
├── common.ts          # Common reusable schemas (pagination, dates, IDs, etc.)
├── analytics.ts       # Analytics & tracking schemas
└── ai.ts              # AI & ML feature schemas
```

## Quick Start

### Basic Usage

```typescript
import { z } from 'zod'
import { paginationSchema, emailSchema, phoneSchema } from '@/lib/validation'

// Define your route schema
const getUsersSchema = z
  .object({
    email: emailSchema.optional(),
    phone: phoneSchema.optional(),
    status: z.enum(['active', 'inactive']).optional(),
  })
  .merge(paginationSchema)

// Use in API route
export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams)
    const validatedParams = getUsersSchema.parse(searchParams)

    // validatedParams is now fully typed and validated
    const users = await getUsers(validatedParams)

    return NextResponse.json({ users })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 })
    }
    throw error
  }
}
```

### With Middleware

```typescript
import { validateRequest } from '@/lib/middleware/validation'
import { chatMessageSchema } from '@/lib/validation'

export const POST = validateRequest(chatMessageSchema, async (request, validatedData) => {
  // validatedData is typed and validated
  const response = await processChatMessage(validatedData)
  return NextResponse.json(response)
})
```

## Common Schemas

### ID Validation

```typescript
import { idSchema, uuidSchema, cuidSchema } from '@/lib/validation'

const schema = z.object({
  id: idSchema, // Any non-empty string
  userId: uuidSchema, // Valid UUID
  sessionId: cuidSchema, // Valid CUID
})
```

### Pagination

```typescript
import { paginationSchema, cursorPaginationSchema } from '@/lib/validation'

// Offset-based pagination
const offsetPaginated = z
  .object({
    filters: z.record(z.string()),
  })
  .merge(paginationSchema)

// Result: { filters, page, limit, offset? }

// Cursor-based pagination
const cursorPaginated = z
  .object({
    query: z.string(),
  })
  .merge(cursorPaginationSchema)

// Result: { query, cursor?, limit }
```

### Date & Time

```typescript
import { dateStringSchema, isoDateSchema, dateRangeSchema } from '@/lib/validation'

const schema = z
  .object({
    createdAt: dateStringSchema, // Any valid date string
    updatedAt: isoDateSchema, // ISO 8601 format required
  })
  .merge(dateRangeSchema) // Adds startDate & endDate
```

### Contact Information

```typescript
import { phoneSchema, emailSchema, nameSchema } from '@/lib/validation'

const contactSchema = z.object({
  name: nameSchema, // 2-100 characters
  email: emailSchema, // Valid email format
  phone: phoneSchema, // International format with validation
})
```

### Search & Filters

```typescript
import { searchSchema, sortSchema } from '@/lib/validation'

const listSchema = z
  .object({
    category: z.string(),
  })
  .merge(searchSchema) // Adds query & filters
  .merge(sortSchema) // Adds sortBy & sortOrder
```

## Analytics Schemas

### Event Tracking

```typescript
import { trackEventSchema } from '@/lib/validation'

export const POST = async (request: NextRequest) => {
  const event = trackEventSchema.parse(await request.json())

  // event.eventType is validated against allowed types
  // event.eventData is optional metadata
  await trackAnalyticsEvent(event)
}
```

### Dashboard Analytics

```typescript
import { analyticsQuerySchema } from '@/lib/validation'

export const GET = async (request: NextRequest) => {
  const params = Object.fromEntries(request.nextUrl.searchParams)
  const query = analyticsQuerySchema.parse(params)

  // Includes: userId?, metric?, groupBy, startDate, endDate, page, limit
  const analytics = await getAnalytics(query)
  return NextResponse.json(analytics)
}
```

### Funnel Analytics

```typescript
import { funnelAnalyticsSchema } from '@/lib/validation'

const body = funnelAnalyticsSchema.parse(await request.json())

// Validates funnel steps (2-10 steps)
// Each step has name and eventType
```

### A/B Testing

```typescript
import { abTestSchema } from '@/lib/validation'

const testData = abTestSchema.parse(await request.json())

// testData.variant is 'A', 'B', or 'control'
// testData.converted is boolean
```

## AI & ML Schemas

### Chat & Conversation

```typescript
import { chatMessageSchema, chatHistorySchema } from '@/lib/validation'

// Send message
const message = chatMessageSchema.parse(await request.json())
// message.message (1-2000 chars)
// message.role ('user' | 'assistant' | 'system')

// Load history
const params = chatHistorySchema.parse(Object.fromEntries(searchParams))
// params.sessionId (required)
// params.limit (default 50, max 100)
```

### Image Analysis

```typescript
import { imageAnalysisSchema } from '@/lib/validation'

const analysis = imageAnalysisSchema.parse(await request.json())

// Either imageUrl OR imageData required
// analysisType: 'diagram' | 'question' | 'equation' | 'general'
// includeOCR, includeExplanation (booleans)
```

### Voice Processing

```typescript
import { voiceProcessingSchema, voiceExplanationSchema } from '@/lib/validation'

// Transcribe/translate audio
const voice = voiceProcessingSchema.parse(await request.json())
// voice.audioData (base64)
// voice.audioFormat ('mp3' | 'wav' | 'webm' | 'ogg')
// voice.language ('en' | 'hi' | 'en-IN')

// Generate voice explanation
const explanation = voiceExplanationSchema.parse(await request.json())
// explanation.text (1-5000 chars)
// explanation.voice (AI voice selection)
// explanation.speed (0.25-4.0)
```

### Question Generation

```typescript
import { questionGeneratorSchema } from '@/lib/validation'

const config = questionGeneratorSchema.parse(await request.json())

// Required: topic, curriculum, grade, difficulty
// count (1-50, default 10)
// questionType ('MCQ' | 'TRUE_FALSE' | etc.)
// includeExplanations, includeHints (booleans)
```

### AI Tutor

```typescript
import { tutorQuerySchema, tutorHistorySaveSchema } from '@/lib/validation'

// Ask question
const query = tutorQuerySchema.parse(await request.json())
// query.question (1-1000 chars)
// query.responseStyle ('detailed' | 'concise' | 'step-by-step' | 'conceptual')
// query.previousContext (up to 10 previous Q&A pairs)

// Save history
const history = tutorHistorySaveSchema.parse(await request.json())
// history.sessionId (required)
// history.messages (array of role/content pairs)
```

### Adaptive Testing

```typescript
import {
  createAdaptiveSessionSchema,
  adaptiveResponseSchema,
  completeAdaptiveSessionSchema,
} from '@/lib/validation'

// Create session
const session = createAdaptiveSessionSchema.parse(await request.json())
// Required: userId, subject, curriculum, grade
// Optional: initialDifficulty, targetQuestions

// Submit response
const response = adaptiveResponseSchema.parse(await request.json())
// Required: sessionId, questionId, selectedAnswer, timeSpent
// Optional: confidence level

// Complete session
const completion = completeAdaptiveSessionSchema.parse(await request.json())
```

## Helper Functions

### Compose Schemas

```typescript
import { withPagination, withSorting, withDateRange } from '@/lib/validation'

// Add pagination to any schema
const paginatedUsers = withPagination(
  z.object({
    role: z.enum(['student', 'teacher']),
  })
)

// Add sorting
const sortedUsers = withSorting(
  z.object({
    status: z.string(),
  })
)

// Add date range
const dateFilteredUsers = withDateRange(
  z.object({
    active: z.boolean(),
  })
)
```

### Create Arrays

```typescript
import { arrayOf } from '@/lib/validation'

const schema = z.object({
  tags: arrayOf(z.string(), { min: 1, max: 10 }),
  scores: arrayOf(z.number(), { min: 1 }),
})
```

### Optional Fields

```typescript
import { makeOptional } from '@/lib/validation'

const schema = z.object({
  required: z.string(),
  optional: makeOptional(z.string()),
})
```

## Best Practices

### 1. Always Use Type Inference

```typescript
import { z } from 'zod'
import { chatMessageSchema } from '@/lib/validation'

// ✅ Good - Type is inferred
type ChatMessage = z.infer<typeof chatMessageSchema>

function processMessage(message: ChatMessage) {
  // message is fully typed
}

// ❌ Bad - Manual type definition
interface ChatMessage {
  message: string
  sessionId?: string
  // ... prone to drift from schema
}
```

### 2. Use Consistent Error Handling

```typescript
import { formatZodErrors } from '@/lib/utils/zodErrors'

try {
  const data = schema.parse(input)
} catch (error) {
  if (error instanceof z.ZodError) {
    // ✅ Good - Consistent error format
    return NextResponse.json(formatZodErrors(error), { status: 400 })

    // ❌ Bad - Raw errors
    return NextResponse.json({ errors: error.issues }, { status: 400 })
  }
}
```

### 3. Validate Query Parameters

```typescript
// ✅ Good - Parse query params
const searchParams = Object.fromEntries(request.nextUrl.searchParams)
const params = analyticsQuerySchema.parse(searchParams)

// ❌ Bad - Direct access without validation
const userId = request.nextUrl.searchParams.get('userId') // Could be null
const page = request.nextUrl.searchParams.get('page') // String, not number
```

### 4. Use safeParse for User Input

```typescript
// ✅ Good - Non-throwing validation
const result = schema.safeParse(userInput)

if (!result.success) {
  return NextResponse.json({ errors: result.error.issues }, { status: 400 })
}

const data = result.data // Typed and validated

// ❌ Bad - Could throw and crash route
const data = schema.parse(userInput)
```

### 5. Reuse Common Patterns

```typescript
// ✅ Good - Reuse common schemas
import { paginationSchema, sortSchema } from '@/lib/validation'

const listUsersSchema = z
  .object({
    role: z.enum(['student', 'teacher']),
  })
  .merge(paginationSchema)
  .merge(sortSchema)

// ❌ Bad - Duplicate validation logic
const listUsersSchema = z.object({
  role: z.enum(['student', 'teacher']),
  page: z.number().int().positive(),
  limit: z.number().int().positive().max(100),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']),
})
```

### 6. Document Custom Schemas

````typescript
/**
 * Schema for creating a new course
 *
 * @example
 * ```typescript
 * const course = createCourseSchema.parse({
 *   title: "NEET Biology Masterclass",
 *   curriculum: "NEET",
 *   grade: "12",
 *   price: 9999
 * })
 * ```
 */
export const createCourseSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().max(2000).optional(),
  curriculum: curriculumSchema,
  grade: gradeSchema,
  price: z.number().positive(),
})
````

## Migration Guide

### Converting Existing Routes

**Before**:

```typescript
export async function POST(request: NextRequest) {
  const body = await request.json()

  // Manual validation
  if (!body.email || typeof body.email !== 'string') {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  if (!body.page || body.page < 1) {
    body.page = 1
  }

  // ... rest of handler
}
```

**After**:

```typescript
import { z } from 'zod'
import { emailSchema, paginationSchema } from '@/lib/validation'

const schema = z
  .object({
    email: emailSchema,
  })
  .merge(paginationSchema)

export async function POST(request: NextRequest) {
  try {
    const body = schema.parse(await request.json())

    // body is typed and validated, page has default value
    // ... rest of handler
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 })
    }
    throw error
  }
}
```

## Common Patterns

### Pattern 1: List with Filters

```typescript
import { paginationSchema, sortSchema, dateRangeSchema } from '@/lib/validation'

const listSchema = z
  .object({
    status: z.enum(['active', 'inactive']).optional(),
    search: z.string().optional(),
  })
  .merge(paginationSchema)
  .merge(sortSchema)
  .merge(dateRangeSchema)
```

### Pattern 2: Create/Update with Validation

```typescript
const createSchema = z.object({
  name: z.string().min(2).max(100),
  email: emailSchema,
  phone: phoneSchema,
})

const updateSchema = createSchema.partial() // All fields optional
```

### Pattern 3: ID Path Parameter

```typescript
import { idParamSchema } from '@/lib/validation'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = idParamSchema.parse(params)
  // ...
}
```

## Testing Validation

```typescript
import { describe, it, expect } from '@jest/globals'
import { chatMessageSchema } from '@/lib/validation'

describe('chatMessageSchema', () => {
  it('should validate correct message', () => {
    const result = chatMessageSchema.safeParse({
      message: 'Hello, can you explain photosynthesis?',
      sessionId: 'session-123',
    })

    expect(result.success).toBe(true)
  })

  it('should reject empty message', () => {
    const result = chatMessageSchema.safeParse({
      message: '',
    })

    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toContain('cannot be empty')
  })

  it('should reject too long message', () => {
    const result = chatMessageSchema.safeParse({
      message: 'a'.repeat(2001),
    })

    expect(result.success).toBe(false)
  })
})
```

## Performance Considerations

1. **Schema Reuse**: Define schemas once and reuse them. Zod caches parsed schemas.

2. **safeParse vs parse**: Use `safeParse` for user input (doesn't throw). Use `parse` when you control the input.

3. **Lazy Schemas**: For recursive or circular schemas, use `z.lazy()`.

4. **Preprocessing**: Use `.preprocess()` or `.transform()` to clean data before validation.

```typescript
const trimmedString = z.string().transform((val) => val.trim())

const phoneWithPreprocess = z.preprocess((val) => String(val).replace(/\s+/g, ''), phoneSchema)
```

## Troubleshooting

### Issue: "Expected X, received Y"

**Cause**: Type coercion not applied
**Solution**: Use `z.coerce` for URL search params

```typescript
// ❌ Bad - searchParams are strings
z.object({
  page: z.number(), // Fails: expected number, got string
})

// ✅ Good - Coerce to number
z.object({
  page: z.coerce.number(),
})
```

### Issue: Optional fields not working

**Cause**: Using `.default()` without `.optional()`
**Solution**: Add `.optional()` before `.default()`

```typescript
// ❌ Bad
status: z.enum(['active', 'inactive']).default('active')

// ✅ Good
status: z.enum(['active', 'inactive']).optional().default('active')
```

### Issue: Union types not validating

**Cause**: Order matters in unions
**Solution**: Put more specific types first

```typescript
// ❌ Bad - string matches everything
z.union([z.string(), z.string().email()])

// ✅ Good - email checked first
z.union([z.string().email(), z.string()])
```

## Next Steps

1. Review existing API routes and add validation
2. Create route-specific schemas in `src/lib/validation/`
3. Update tests to include validation testing
4. Add validation to middleware for automatic enforcement

## Resources

- [Zod Documentation](https://zod.dev/)
- [Zod Error Handling](https://zod.dev/ERROR_HANDLING)
- [TypeScript Integration](https://zod.dev/#type-inference)
