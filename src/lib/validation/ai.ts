import { z } from 'zod'
import { idSchema, metadataSchema, curriculumSchema, gradeSchema, difficultySchema } from './common'

/**
 * AI & ML API Validation Schemas
 */

// ============================================
// Chat & Conversation
// ============================================

export const chatMessageSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(2000, 'Message too long'),
  sessionId: idSchema.optional(),
  userId: idSchema.optional(),
  context: metadataSchema.optional(),
  role: z.enum(['user', 'assistant', 'system']).optional().default('user'),
})

export const chatHistorySchema = z.object({
  sessionId: idSchema,
  limit: z.coerce.number().int().positive().max(100).default(50),
  before: z.string().datetime().optional(),
})

// ============================================
// Image Analysis
// ============================================

export const imageAnalysisSchema = z.object({
  imageUrl: z.string().url('Must be a valid image URL').optional(),
  imageData: z.string().optional(), // Base64 encoded
  analysisType: z.enum(['diagram', 'question', 'equation', 'general']).default('general'),
  includeOCR: z.boolean().default(false),
  includeExplanation: z.boolean().default(true),
  curriculum: curriculumSchema.optional(),
  grade: gradeSchema.optional(),
})

// ============================================
// Voice Processing
// ============================================

export const voiceProcessingSchema = z.object({
  audioData: z.string(), // Base64 encoded audio
  audioFormat: z.enum(['mp3', 'wav', 'webm', 'ogg']).default('webm'),
  language: z.enum(['en', 'hi', 'en-IN']).default('en'),
  processType: z.enum(['transcribe', 'translate', 'analyze']).default('transcribe'),
})

export const voiceExplanationSchema = z.object({
  text: z.string().min(1).max(5000),
  topic: z.string().min(1).max(200),
  voice: z.enum(['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer']).default('nova'),
  speed: z.number().min(0.25).max(4.0).default(1.0),
  format: z.enum(['mp3', 'opus', 'aac', 'flac']).default('mp3'),
})

// ============================================
// Question Generation
// ============================================

export const questionGeneratorSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
  curriculum: curriculumSchema,
  grade: gradeSchema,
  difficulty: difficultySchema,
  count: z.coerce.number().int().positive().max(50).default(10),
  questionType: z
    .enum(['MCQ', 'TRUE_FALSE', 'SHORT_ANSWER', 'LONG_ANSWER', 'MIXED'])
    .default('MCQ'),
  includeExplanations: z.boolean().default(true),
  includeHints: z.boolean().default(false),
})

// ============================================
// AI Tutor
// ============================================

export const tutorQuerySchema = z.object({
  question: z.string().min(1, 'Question cannot be empty').max(1000),
  topic: z.string().optional(),
  curriculum: curriculumSchema.optional(),
  grade: gradeSchema.optional(),
  previousContext: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .max(10)
    .optional(),
  responseStyle: z.enum(['detailed', 'concise', 'step-by-step', 'conceptual']).default('detailed'),
})

export const tutorHistorySaveSchema = z.object({
  sessionId: idSchema,
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
        timestamp: z.string().datetime().optional(),
      })
    )
    .min(1),
  metadata: metadataSchema.optional(),
})

// ============================================
// Adaptive Testing
// ============================================

export const createAdaptiveSessionSchema = z.object({
  userId: idSchema,
  subject: z.string().min(1),
  curriculum: curriculumSchema,
  grade: gradeSchema,
  initialDifficulty: difficultySchema.optional().default('MEDIUM'),
  targetQuestions: z.coerce.number().int().positive().max(100).default(20),
})

export const adaptiveResponseSchema = z.object({
  sessionId: idSchema,
  questionId: idSchema,
  selectedAnswer: z.string().min(1),
  timeSpent: z.number().positive(), // in seconds
  confidence: z.enum(['very_low', 'low', 'medium', 'high', 'very_high']).optional(),
})

export const completeAdaptiveSessionSchema = z.object({
  sessionId: idSchema,
  forcedCompletion: z.boolean().default(false),
})

// ============================================
// Performance Analytics
// ============================================

export const aiPerformanceQuerySchema = z.object({
  model: z.enum(['gpt-4', 'gpt-3.5-turbo', 'claude-3.5-sonnet', 'gemini-pro']).optional(),
  metric: z.enum(['latency', 'cost', 'accuracy', 'token_usage', 'error_rate']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  groupBy: z.enum(['hour', 'day', 'week']).default('day'),
})

// ============================================
// Education Hub
// ============================================

export const educationHubQuerySchema = z.object({
  query: z.string().min(1).max(500),
  category: z
    .enum(['concept_explanation', 'problem_solving', 'exam_prep', 'doubt_clearing', 'revision'])
    .optional(),
  curriculum: curriculumSchema.optional(),
  grade: gradeSchema.optional(),
  includeRelatedTopics: z.boolean().default(true),
  includeVisuals: z.boolean().default(false),
})

// ============================================
// Test Start
// ============================================

export const aiTestStartSchema = z.object({
  userId: idSchema,
  testType: z.enum(['practice', 'mock', 'adaptive', 'chapter']),
  subject: z.string().min(1),
  topics: z.array(z.string()).min(1).max(10),
  difficulty: difficultySchema,
  questionCount: z.coerce.number().int().positive().max(100),
  timeLimit: z.coerce.number().int().positive().optional(), // in minutes
  curriculum: curriculumSchema.optional(),
  grade: gradeSchema.optional(),
})

// ============================================
// Unified Chat
// ============================================

export const unifiedChatSchema = z.object({
  message: z.string().min(1).max(2000),
  sessionId: idSchema.optional(),
  userId: idSchema.optional(),
  chatType: z
    .enum(['general', 'tutor', 'doubt_solving', 'exam_prep', 'concept_learning'])
    .default('general'),
  context: z
    .object({
      currentTopic: z.string().optional(),
      curriculum: curriculumSchema.optional(),
      grade: gradeSchema.optional(),
      previousMessages: z.array(z.string()).max(5).optional(),
    })
    .optional(),
  includeResources: z.boolean().default(false),
  generateFollowUps: z.boolean().default(true),
})

// ============================================
// AI Management
// ============================================

export const aiConfigUpdateSchema = z.object({
  model: z.string().optional(),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().int().positive().max(8000).optional(),
  topP: z.number().min(0).max(1).optional(),
  frequencyPenalty: z.number().min(-2).max(2).optional(),
  presencePenalty: z.number().min(-2).max(2).optional(),
})

export const aiUsageQuerySchema = z.object({
  userId: idSchema.optional(),
  model: z.string().optional(),
  feature: z
    .enum(['chat', 'image_analysis', 'voice', 'question_generation', 'tutoring', 'testing'])
    .optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
})
