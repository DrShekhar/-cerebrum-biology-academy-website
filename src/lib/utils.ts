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
