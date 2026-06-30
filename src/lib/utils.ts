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
 * Money unit convention:
 * `courses.totalFees`, `enrollments.{totalFees,paidAmount,pendingAmount}` and
 * `payments.amount` are all stored as integer PAISE (₹1 = 100 paise), matching
 * Razorpay's native unit. Convert to rupees ONLY at a display boundary.
 * (The fee_plans / payment_installments subsystem is separate — Decimal rupees.)
 */

/** Integer paise → rupees (number). e.g. 7200000 → 72000. */
export function paiseToRupees(paise: number | null | undefined): number {
  return Math.round(Number(paise ?? 0)) / 100
}

/** Integer paise → localized ₹ string for display. e.g. 7200000 → "₹72,000". */
export function formatPaiseToINR(paise: number | null | undefined): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(paiseToRupees(paise))
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
