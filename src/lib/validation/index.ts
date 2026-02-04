/**
 * Centralized Validation Schemas
 *
 * This module exports all Zod validation schemas used across the application.
 * Schemas are organized by domain for easy discovery and reuse.
 * Named exports enable better tree-shaking than star exports.
 *
 * @example
 * ```typescript
 * import { paginationSchema, emailSchema } from '@/lib/validation'
 *
 * const querySchema = z.object({
 *   email: emailSchema,
 * }).merge(paginationSchema)
 * ```
 */

// Common schemas - explicit named exports for tree-shaking
export {
  idSchema,
  uuidSchema,
  cuidSchema,
  paginationSchema,
  cursorPaginationSchema,
  dateStringSchema,
  isoDateSchema,
  dateRangeSchema,
  searchSchema,
  sortSchema,
  phoneSchema,
  emailSchema,
  nameSchema,
  urlSchema,
  slugSchema,
  colorSchema,
  fileTypeSchema,
  fileSizeSchema,
  metadataSchema,
  jsonSchema,
  idParamSchema,
  optionalIdSchema,
  booleanStringSchema,
  statusSchema,
  curriculumSchema,
  gradeSchema,
  difficultySchema,
  eventTypeSchema,
  analyticsEventSchema,
  withPagination,
  withSorting,
  withDateRange,
  makeOptional,
  arrayOf,
} from './common'

// Analytics schemas - explicit named exports
export {
  trackEventSchema,
  analyticsQuerySchema,
  funnelAnalyticsSchema,
  heatmapQuerySchema,
  abTestSchema,
  realTimeQuerySchema,
  exportAnalyticsSchema,
  performanceMetricsSchema,
  comparativeAnalyticsSchema,
} from './analytics'

// AI schemas - explicit named exports
export {
  chatMessageSchema,
  chatHistorySchema,
  imageAnalysisSchema,
  voiceProcessingSchema,
  voiceExplanationSchema,
  questionGeneratorSchema,
  tutorQuerySchema,
  tutorHistorySaveSchema,
  createAdaptiveSessionSchema,
  adaptiveResponseSchema,
  completeAdaptiveSessionSchema,
  aiPerformanceQuerySchema,
  educationHubQuerySchema,
  aiTestStartSchema,
  unifiedChatSchema,
  aiConfigUpdateSchema,
  aiUsageQuerySchema,
} from './ai'

// Re-export Zod for convenience
export { z } from 'zod'
