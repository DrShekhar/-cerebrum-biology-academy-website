import { z } from 'zod'

/**
 * Common reusable Zod validation schemas
 * Used across multiple API routes for consistency
 */

// ============================================
// ID Validation Schemas
// ============================================

export const idSchema = z.string().min(1, 'ID is required')

export const uuidSchema = z.string().uuid('Invalid UUID format')

export const cuidSchema = z.string().regex(/^c[a-z0-9]{24}$/, 'Invalid CUID format')

// ============================================
// Pagination Schemas
// ============================================

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  offset: z.coerce.number().int().nonnegative().optional(),
})

export const cursorPaginationSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().positive().max(100).default(10),
})

// ============================================
// Date/Time Schemas
// ============================================

export const dateStringSchema = z
  .string()
  .refine((val) => !isNaN(Date.parse(val)), 'Invalid date format')

export const isoDateSchema = z.string().datetime('Must be valid ISO 8601 datetime')

export const dateRangeSchema = z.object({
  startDate: dateStringSchema,
  endDate: dateStringSchema,
})

// ============================================
// Search & Filter Schemas
// ============================================

export const searchSchema = z.object({
  query: z.string().min(1).max(100),
  filters: z.record(z.string(), z.any()).optional(),
})

export const sortSchema = z.object({
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

// ============================================
// Contact Information Schemas
// ============================================

export const phoneSchema = z
  .string()
  .min(10, 'Phone must be at least 10 digits')
  .regex(/^[+]?[\d\s()-]+$/, 'Invalid phone number format')

export const emailSchema = z.string().email('Invalid email address')

export const nameSchema = z.string().min(2, 'Name must be at least 2 characters').max(100)

// ============================================
// User Input Schemas
// ============================================

export const urlSchema = z.string().url('Invalid URL format')

export const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format')

export const colorSchema = z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color')

// ============================================
// File Upload Schemas
// ============================================

export const fileTypeSchema = z.enum(['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])

export const fileSizeSchema = z.number().max(10 * 1024 * 1024, 'File too large (max 10MB)')

// ============================================
// Metadata & JSON Schemas
// ============================================

export const metadataSchema = z.record(z.string(), z.unknown())

export const jsonSchema = z.any()

// ============================================
// Common Request Body Schemas
// ============================================

export const idParamSchema = z.object({
  id: idSchema,
})

export const optionalIdSchema = z.object({
  id: idSchema.optional(),
})

// ============================================
// Status & State Schemas
// ============================================

export const booleanStringSchema = z
  .string()
  .transform((val) => val === 'true')
  .pipe(z.boolean())

export const statusSchema = z.enum(['active', 'inactive', 'pending', 'archived'])

// ============================================
// Curriculum & Education Schemas
// ============================================

export const curriculumSchema = z.enum(['NEET', 'CBSE', 'ICSE', 'IB', 'IGCSE', 'STATE_BOARD'])

export const gradeSchema = z.enum([
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  'NEET_DROPPER',
  'NEET_REPEATER',
])

export const difficultySchema = z.enum(['EASY', 'MEDIUM', 'HARD', 'MIXED'])

// ============================================
// Analytics & Tracking Schemas
// ============================================

export const eventTypeSchema = z.enum([
  'page_view',
  'click',
  'form_submit',
  'purchase',
  'signup',
  'login',
  'logout',
])

export const analyticsEventSchema = z.object({
  eventType: eventTypeSchema,
  eventData: metadataSchema.optional(),
  timestamp: isoDateSchema.optional(),
})

// ============================================
// Helper Functions
// ============================================

/**
 * Merge pagination with other schemas
 */
export function withPagination<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  return schema.merge(paginationSchema)
}

/**
 * Merge sorting with other schemas
 */
export function withSorting<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  return schema.merge(sortSchema)
}

/**
 * Merge date range with other schemas
 */
export function withDateRange<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  return schema.merge(dateRangeSchema)
}

/**
 * Create optional version of any schema
 */
export function makeOptional<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional()
}

/**
 * Create array version of any schema with min/max constraints
 */
export function arrayOf<T extends z.ZodTypeAny>(
  schema: T,
  options?: { min?: number; max?: number }
) {
  let arraySchema = z.array(schema)

  if (options?.min !== undefined) {
    arraySchema = arraySchema.min(options.min)
  }

  if (options?.max !== undefined) {
    arraySchema = arraySchema.max(options.max)
  }

  return arraySchema
}
