import { NextRequest } from 'next/server'
import { z, ZodSchema, ZodError } from 'zod'
import { logger } from '@/lib/utils/logger'

export interface ValidationResult<T = any> {
  success: boolean
  data?: T
  error?: string
  details?: any[]
}

// Generic validation middleware
export async function withValidation<T>(
  request: NextRequest,
  schema: ZodSchema<T>,
  source: 'body' | 'query' | 'params' = 'body'
): Promise<ValidationResult<T>> {
  try {
    let data: any

    switch (source) {
      case 'body':
        try {
          data = await request.json()
        } catch (error) {
          return {
            success: false,
            error: 'Invalid JSON in request body',
            details: [{ message: 'Request body must be valid JSON' }]
          }
        }
        break

      case 'query':
        const { searchParams } = new URL(request.url)
        data = Object.fromEntries(searchParams.entries())
        break

      case 'params':
        // This would typically be handled by the route handler
        data = {}
        break

      default:
        return {
          success: false,
          error: 'Invalid validation source',
          details: [{ message: 'Validation source must be body, query, or params' }]
        }
    }

    const result = schema.parse(data)
    return {
      success: true,
      data: result
    }

  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        details: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
          expected: err.expected,
          received: err.received
        }))
      }
    }

    logger.error('Validation error:', error)
    return {
      success: false,
      error: 'Validation error occurred',
      details: [{ message: 'Internal validation error' }]
    }
  }
}

// Common validation schemas

// User-related schemas
export const userIdSchema = z.string().min(1, 'User ID is required')

export const emailSchema = z.string()
  .email('Invalid email address')
  .min(5, 'Email must be at least 5 characters')
  .max(254, 'Email must not exceed 254 characters')

export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must not exceed 128 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number')

export const phoneSchema = z.string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
  .optional()

// Pagination schemas
export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

export const searchSchema = z.object({
  query: z.string().min(1).max(100),
  filters: z.record(z.any()).optional()
}).extend(paginationSchema.shape)

// Date and time schemas
export const dateStringSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')

export const dateTimeSchema = z.string().datetime('Invalid datetime format')

export const timeRangeSchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional()
}).refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return new Date(data.startDate) <= new Date(data.endDate)
    }
    return true
  },
  { message: 'End date must be after start date' }
)

// File upload schemas
export const imageUploadSchema = z.object({
  filename: z.string().min(1, 'Filename is required'),
  mimetype: z.string().regex(/^image\/(jpeg|jpg|png|gif|webp)$/i, 'Invalid image format'),
  size: z.number().max(5 * 1024 * 1024, 'Image size must not exceed 5MB'),
  url: z.string().url('Invalid image URL').optional()
})

export const fileUploadSchema = z.object({
  filename: z.string().min(1, 'Filename is required'),
  mimetype: z.string(),
  size: z.number().max(10 * 1024 * 1024, 'File size must not exceed 10MB'),
  url: z.string().url('Invalid file URL').optional()
})

// Academic-related schemas
export const curriculumSchema = z.enum(['NEET', 'CBSE', 'ICSE', 'IB', 'IGCSE', 'STATE_BOARD'])

export const gradeSchema = z.enum(['CLASS_9', 'CLASS_10', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION'])

export const subjectSchema = z.enum(['biology', 'botany', 'zoology', 'physics', 'chemistry'])

export const difficultySchema = z.enum(['EASY', 'MEDIUM', 'HARD', 'EXPERT'])

export const questionTypeSchema = z.enum([
  'MCQ', 'SHORT_ANSWER', 'DIAGRAM', 'TRUE_FALSE',
  'FILL_BLANK', 'MULTIPLE_SELECT', 'MATCH_FOLLOWING', 'NUMERICAL'
])

// Test-related schemas
export const testTypeSchema = z.enum([
  'PRACTICE_TEST', 'MOCK_TEST', 'FULL_TEST', 'QUICK_TEST',
  'ADAPTIVE_TEST', 'TIMED_TEST', 'DIAGNOSTIC_TEST'
])

export const testCategorySchema = z.enum([
  'TOPIC_WISE', 'SUBJECT_WISE', 'FULL_SYLLABUS',
  'CHAPTER_WISE', 'DIFFICULTY_WISE', 'PREVIOUS_YEAR', 'MIXED'
])

// Question validation schema
export const questionValidationSchema = z.object({
  topic: z.string().min(1, 'Topic is required').max(100),
  subtopic: z.string().max(100).optional(),
  curriculum: curriculumSchema,
  grade: gradeSchema,
  subject: subjectSchema.default('biology'),
  type: questionTypeSchema,
  difficulty: difficultySchema,
  question: z.string().min(10, 'Question must be at least 10 characters').max(2000),
  options: z.array(z.string().min(1).max(500))
    .min(2, 'MCQ questions must have at least 2 options')
    .max(6, 'MCQ questions cannot have more than 6 options')
    .optional(),
  correctAnswer: z.string().min(1, 'Correct answer is required').max(500),
  explanation: z.string().max(2000).optional(),
  solutionSteps: z.array(z.string().max(500)).max(10).optional(),
  questionImage: z.string().url().optional(),
  explanationImage: z.string().url().optional(),
  videoExplanation: z.string().url().optional(),
  source: z.string().max(100).optional(),
  examYear: z.number().min(1990).max(new Date().getFullYear() + 5).optional(),
  marks: z.number().min(1).max(10).default(1),
  timeLimit: z.number().min(30).max(3600).optional(), // 30 seconds to 1 hour
  tags: z.array(z.string().max(50)).max(20).optional(),
  relatedConcepts: z.array(z.string().max(100)).max(10).optional(),
  keywords: z.array(z.string().max(50)).max(20).optional()
}).refine(
  (data) => {
    // MCQ questions must have options
    if (data.type === 'MCQ' && (!data.options || data.options.length < 2)) {
      return false
    }
    return true
  },
  { message: 'MCQ questions must have at least 2 options' }
).refine(
  (data) => {
    // For MCQ, correct answer must be one of the options
    if (data.type === 'MCQ' && data.options && !data.options.includes(data.correctAnswer)) {
      return false
    }
    return true
  },
  { message: 'Correct answer must be one of the provided options for MCQ questions' }
)

// Test session validation schema
export const testSessionValidationSchema = z.object({
  testTemplateId: z.string().min(1, 'Test template ID is required'),
  userId: z.string().min(1).optional(),
  freeUserId: z.string().min(1).optional(),
  customSettings: z.object({
    timeLimit: z.number().min(300).max(14400).optional(), // 5 minutes to 4 hours
    shuffleQuestions: z.boolean().default(true),
    showResults: z.boolean().default(true),
    allowReview: z.boolean().default(true),
    negativeMarking: z.boolean().default(false),
    enableProctoring: z.boolean().default(false)
  }).optional()
}).refine(
  (data) => data.userId || data.freeUserId,
  { message: 'Either userId or freeUserId must be provided' }
)

// Answer submission validation schema
export const answerSubmissionSchema = z.object({
  questionId: z.string().min(1, 'Question ID is required'),
  selectedAnswer: z.string().min(1, 'Answer is required').max(500),
  timeSpent: z.number().min(0).max(3600).optional(), // Max 1 hour per question
  confidence: z.number().min(1).max(5).optional(),
  isMarkedForReview: z.boolean().default(false),
  deviceType: z.enum(['mobile', 'tablet', 'desktop']).optional(),
  sessionData: z.object({
    timestamp: z.string().datetime(),
    userAgent: z.string().optional(),
    screenSize: z.string().optional(),
    browserEvents: z.array(z.object({
      type: z.string(),
      timestamp: z.string().datetime(),
      data: z.any().optional()
    })).optional()
  }).optional()
})

// Progress filter validation schema
export const progressFilterSchema = z.object({
  curriculum: curriculumSchema.optional(),
  grade: gradeSchema.optional(),
  subject: subjectSchema.optional(),
  topics: z.array(z.string()).or(z.string()).optional(),
  timeFrame: z.enum(['week', 'month', 'quarter', 'year', 'all']).default('all'),
  includeInactive: z.boolean().default(false),
  groupBy: z.enum(['topic', 'difficulty', 'type', 'curriculum']).default('topic'),
  sortBy: z.enum(['accuracy', 'masteryScore', 'lastPracticed', 'totalQuestions']).default('masteryScore'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

// Bulk operation validation schema
export const bulkOperationSchema = z.object({
  operation: z.enum(['create', 'update', 'delete', 'activate', 'deactivate']),
  items: z.array(z.any()).min(1, 'At least one item is required').max(100, 'Cannot process more than 100 items at once'),
  confirmDangerous: z.boolean().default(false) // Required for destructive operations
}).refine(
  (data) => {
    if (['delete', 'deactivate'].includes(data.operation)) {
      return data.confirmDangerous === true
    }
    return true
  },
  { message: 'Dangerous operations require confirmation' }
)

// Validation helper functions

// Validate array of items against schema
export function validateArray<T>(
  items: any[],
  schema: ZodSchema<T>,
  maxItems: number = 100
): ValidationResult<T[]> {
  if (!Array.isArray(items)) {
    return {
      success: false,
      error: 'Expected an array',
      details: [{ message: 'Input must be an array' }]
    }
  }

  if (items.length === 0) {
    return {
      success: false,
      error: 'Array cannot be empty',
      details: [{ message: 'At least one item is required' }]
    }
  }

  if (items.length > maxItems) {
    return {
      success: false,
      error: `Too many items`,
      details: [{ message: `Maximum ${maxItems} items allowed, received ${items.length}` }]
    }
  }

  const errors: any[] = []
  const validatedItems: T[] = []

  items.forEach((item, index) => {
    try {
      const validated = schema.parse(item)
      validatedItems.push(validated)
    } catch (error) {
      if (error instanceof ZodError) {
        errors.push({
          index,
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
            code: err.code
          }))
        })
      }
    }
  })

  if (errors.length > 0) {
    return {
      success: false,
      error: 'Validation failed for some items',
      details: errors
    }
  }

  return {
    success: true,
    data: validatedItems
  }
}

// Validate partial updates (only validate provided fields)
export function validatePartialUpdate<T>(
  data: any,
  schema: ZodSchema<T>
): ValidationResult<Partial<T>> {
  try {
    // Create a partial version of the schema
    const partialSchema = schema.partial()
    const result = partialSchema.parse(data)

    return {
      success: true,
      data: result
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        details: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code
        }))
      }
    }

    return {
      success: false,
      error: 'Validation error occurred'
    }
  }
}

// Sanitize and validate file uploads
export function validateFileUpload(
  file: any,
  options: {
    allowedTypes?: string[]
    maxSize?: number
    allowedExtensions?: string[]
  } = {}
): ValidationResult<any> {
  const {
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    maxSize = 5 * 1024 * 1024, // 5MB
    allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf']
  } = options

  if (!file) {
    return {
      success: false,
      error: 'No file provided'
    }
  }

  // Check file size
  if (file.size > maxSize) {
    return {
      success: false,
      error: 'File too large',
      details: [{
        message: `File size ${file.size} bytes exceeds limit of ${maxSize} bytes`
      }]
    }
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      success: false,
      error: 'Invalid file type',
      details: [{
        message: `File type ${file.type} not allowed. Allowed types: ${allowedTypes.join(', ')}`
      }]
    }
  }

  // Check file extension
  const extension = file.name?.split('.').pop()?.toLowerCase()
  if (extension && !allowedExtensions.includes(extension)) {
    return {
      success: false,
      error: 'Invalid file extension',
      details: [{
        message: `File extension .${extension} not allowed. Allowed extensions: ${allowedExtensions.join(', ')}`
      }]
    }
  }

  return {
    success: true,
    data: file
  }
}

export default {
  withValidation,
  validateArray,
  validatePartialUpdate,
  validateFileUpload,

  // Export schemas
  userIdSchema,
  emailSchema,
  passwordSchema,
  phoneSchema,
  paginationSchema,
  searchSchema,
  dateStringSchema,
  dateTimeSchema,
  timeRangeSchema,
  imageUploadSchema,
  fileUploadSchema,
  curriculumSchema,
  gradeSchema,
  subjectSchema,
  difficultySchema,
  questionTypeSchema,
  testTypeSchema,
  testCategorySchema,
  questionValidationSchema,
  testSessionValidationSchema,
  answerSubmissionSchema,
  progressFilterSchema,
  bulkOperationSchema
}