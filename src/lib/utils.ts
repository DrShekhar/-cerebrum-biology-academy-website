import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { nanoid } from 'nanoid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a UUID-like unique identifier
 * Uses crypto.randomUUID() when available (modern browsers)
 * Falls back to nanoid for older browsers (iOS Safari < 15.4)
 */
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  // Fallback for older browsers - generates UUID-like string using nanoid
  return `${nanoid(8)}-${nanoid(4)}-${nanoid(4)}-${nanoid(4)}-${nanoid(12)}`
}

// Re-export logger from utils directory
export { logger } from './utils/index'

/**
 * Type guard to check if a value is an Error object
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error
}

/**
 * Safely extract error message from unknown error type
 * Use in catch blocks: catch (error) { const message = getErrorMessage(error) }
 */
export function getErrorMessage(error: unknown): string {
  if (isError(error)) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message)
  }
  return 'An unknown error occurred'
}

/**
 * Type-safe Object.entries for Record types
 * Returns properly typed key-value tuples instead of [string, unknown][]
 */
export function typedEntries<K extends string, V>(obj: Record<K, V>): [K, V][] {
  return Object.entries(obj) as [K, V][]
}

/**
 * Type-safe Object.keys for Record types
 */
export function typedKeys<K extends string>(obj: Record<K, unknown>): K[] {
  return Object.keys(obj) as K[]
}

/**
 * Parse a positive integer query param (e.g. ?limit / ?page) safely.
 * Returns `fallback` for null/empty/non-numeric values (plain parseInt would
 * yield NaN, which throws when handed to Prisma `take`/`skip`). The result is
 * clamped to [min, max].
 */
export function parsePositiveInt(
  value: string | null | undefined,
  fallback: number,
  { min = 1, max = Number.MAX_SAFE_INTEGER }: { min?: number; max?: number } = {}
): number {
  const parsed = Number.parseInt(value ?? '', 10)
  const n = Number.isFinite(parsed) ? parsed : fallback
  return Math.min(Math.max(n, min), max)
}
