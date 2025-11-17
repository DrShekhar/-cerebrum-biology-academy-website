/**
 * Centralized Validation Schemas
 *
 * This module exports all Zod validation schemas used across the application.
 * Schemas are organized by domain for easy discovery and reuse.
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

// Common schemas
export * from './common'

// Domain-specific schemas
export * from './analytics'
export * from './ai'

// Re-export Zod for convenience
export { z } from 'zod'
