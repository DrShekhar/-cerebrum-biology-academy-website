/**
 * Follow-up System Error Handling Utilities
 *
 * This module provides comprehensive error handling, validation,
 * and logging utilities for the automated follow-up system.
 */

import { LeadStage, FollowupTrigger, FollowupAction } from '@/generated/prisma'

/**
 * Custom error types for better error categorization
 */
export class FollowupValidationError extends Error {
  constructor(
    message: string,
    public context?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'FollowupValidationError'
  }
}

export class FollowupProcessingError extends Error {
  constructor(
    message: string,
    public context?: Record<string, unknown>,
    public recoverable: boolean = true
  ) {
    super(message)
    this.name = 'FollowupProcessingError'
  }
}

export class FollowupTimeoutError extends Error {
  constructor(
    message: string,
    public timeout: number
  ) {
    super(message)
    this.name = 'FollowupTimeoutError'
  }
}

/**
 * Enhanced logging with context
 */
export function logError(
  operation: string,
  error: unknown,
  context?: Record<string, unknown>
): void {
  const errorMessage = error instanceof Error ? error.message : String(error)
  const errorStack = error instanceof Error ? error.stack : undefined

  console.error(`[FollowupSystem] Error in ${operation}:`, {
    message: errorMessage,
    stack: errorStack,
    context,
    timestamp: new Date().toISOString(),
  })
}

export function logWarning(
  operation: string,
  message: string,
  context?: Record<string, unknown>
): void {
  console.warn(`[FollowupSystem] Warning in ${operation}:`, {
    message,
    context,
    timestamp: new Date().toISOString(),
  })
}

export function logInfo(
  operation: string,
  message: string,
  context?: Record<string, unknown>
): void {
  console.log(`[FollowupSystem] ${operation}:`, {
    message,
    context,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Validate trigger conditions structure
 */
export function validateTriggerConditions(
  triggerType: FollowupTrigger,
  conditions: any
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!conditions || typeof conditions !== 'object') {
    errors.push('Trigger conditions must be a valid object')
    return { valid: false, errors }
  }

  switch (triggerType) {
    case 'STAGE_CHANGE':
      if (!conditions.targetStage && !conditions.targetStages && !conditions.toStage) {
        errors.push('STAGE_CHANGE requires targetStage, targetStages, or toStage')
      }
      break

    case 'TIME_BASED':
      if (!conditions.timePeriodDays || typeof conditions.timePeriodDays !== 'number') {
        errors.push('TIME_BASED requires timePeriodDays as a number')
      }
      if (conditions.timePeriodDays && conditions.timePeriodDays < 0) {
        errors.push('timePeriodDays must be non-negative')
      }
      break

    case 'SCORE_THRESHOLD':
      if (conditions.scoreThreshold == null) {
        errors.push('SCORE_THRESHOLD requires scoreThreshold')
      }
      if (
        conditions.scoreThreshold != null &&
        (conditions.scoreThreshold < 0 || conditions.scoreThreshold > 100)
      ) {
        errors.push('scoreThreshold must be between 0 and 100')
      }
      break

    case 'INACTIVITY':
      if (!conditions.inactivityDays || typeof conditions.inactivityDays !== 'number') {
        errors.push('INACTIVITY requires inactivityDays as a number')
      }
      if (conditions.inactivityDays && conditions.inactivityDays < 0) {
        errors.push('inactivityDays must be non-negative')
      }
      break

    case 'OFFER_SENT':
      if (conditions.timePeriodDays != null && conditions.timePeriodDays < 0) {
        errors.push('timePeriodDays must be non-negative')
      }
      break

    case 'DEMO_NO_SHOW':
    case 'DEMO_COMPLETED':
      break

    case 'CUSTOM':
      if (!conditions.customCondition || typeof conditions.customCondition !== 'string') {
        errors.push('CUSTOM requires customCondition as a string')
      }
      break

    default:
      errors.push(`Unknown trigger type: ${triggerType}`)
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Validate lead data completeness
 */
export function validateLeadData(lead: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!lead) {
    errors.push('Lead data is null or undefined')
    return { valid: false, errors }
  }

  if (!lead.id) {
    errors.push('Lead must have an id')
  }

  if (!lead.studentName && !lead.email) {
    errors.push('Lead must have either studentName or email')
  }

  if (lead.email && !isValidEmail(lead.email)) {
    errors.push('Lead email is invalid')
  }

  if (lead.phone && !isValidPhone(lead.phone)) {
    logWarning('validateLeadData', 'Lead phone format may be invalid', { phone: lead.phone })
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Validate rule data completeness
 */
export function validateRuleData(rule: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!rule) {
    errors.push('Rule data is null or undefined')
    return { valid: false, errors }
  }

  if (!rule.id) {
    errors.push('Rule must have an id')
  }

  if (!rule.name) {
    errors.push('Rule must have a name')
  }

  if (!rule.triggerType) {
    errors.push('Rule must have a triggerType')
  }

  if (!rule.actionType) {
    errors.push('Rule must have an actionType')
  }

  if (rule.isActive !== true && rule.isActive !== false) {
    errors.push('Rule must have a valid isActive boolean value')
  }

  if (rule.delayMinutes != null && (rule.delayMinutes < 0 || rule.delayMinutes > 10080)) {
    errors.push('delayMinutes must be between 0 and 10080 (1 week)')
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Validate queue item data
 */
export function validateQueueItemData(queueItem: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!queueItem) {
    errors.push('Queue item is null or undefined')
    return { valid: false, errors }
  }

  if (!queueItem.id) {
    errors.push('Queue item must have an id')
  }

  if (!queueItem.leadId) {
    errors.push('Queue item must have a leadId')
  }

  if (!queueItem.ruleId) {
    errors.push('Queue item must have a ruleId')
  }

  if (!queueItem.status) {
    errors.push('Queue item must have a status')
  }

  if (!queueItem.scheduledFor) {
    errors.push('Queue item must have a scheduledFor date')
  }

  if (queueItem.attempt != null && queueItem.attempt < 0) {
    errors.push('Queue item attempt must be non-negative')
  }

  if (queueItem.maxAttempts != null && queueItem.maxAttempts < 1) {
    errors.push('Queue item maxAttempts must be at least 1')
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Email validation
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Phone validation (basic)
 */
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[\d\s()-]{10,}$/
  return phoneRegex.test(phone)
}

/**
 * Sanitize template content to prevent injection
 */
export function sanitizeTemplateContent(content: string): string {
  if (!content) return ''

  return content
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
}

/**
 * Safe JSON parse with error handling
 */
export function safeJsonParse<T>(json: string | null | undefined, defaultValue: T): T {
  if (!json) return defaultValue

  try {
    return JSON.parse(json) as T
  } catch (error) {
    logWarning('safeJsonParse', 'Failed to parse JSON', { json, error })
    return defaultValue
  }
}

/**
 * Create timeout promise for race conditions
 */
export function createTimeoutPromise<T>(
  promise: Promise<T>,
  timeoutMs: number,
  operation: string
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () =>
          reject(
            new FollowupTimeoutError(`${operation} timed out after ${timeoutMs}ms`, timeoutMs)
          ),
        timeoutMs
      )
    ),
  ])
}

/**
 * Circuit breaker for repeated failures
 */
export class CircuitBreaker {
  private failures: Map<string, number> = new Map()
  private openUntil: Map<string, number> = new Map()

  constructor(
    private maxFailures: number = 5,
    private resetTimeMs: number = 60000
  ) {}

  isOpen(key: string): boolean {
    const openUntil = this.openUntil.get(key)
    if (openUntil && Date.now() < openUntil) {
      return true
    }

    if (openUntil && Date.now() >= openUntil) {
      this.failures.delete(key)
      this.openUntil.delete(key)
    }

    return false
  }

  recordSuccess(key: string): void {
    this.failures.delete(key)
    this.openUntil.delete(key)
  }

  recordFailure(key: string): void {
    const currentFailures = (this.failures.get(key) || 0) + 1
    this.failures.set(key, currentFailures)

    if (currentFailures >= this.maxFailures) {
      this.openUntil.set(key, Date.now() + this.resetTimeMs)
      logWarning('CircuitBreaker', `Circuit opened for ${key}`, {
        failures: currentFailures,
        resetTime: new Date(Date.now() + this.resetTimeMs).toISOString(),
      })
    }
  }

  getStatus(key: string): { failures: number; isOpen: boolean; opensAt?: string } {
    const failures = this.failures.get(key) || 0
    const openUntil = this.openUntil.get(key)

    return {
      failures,
      isOpen: this.isOpen(key),
      opensAt: openUntil ? new Date(openUntil).toISOString() : undefined,
    }
  }
}

/**
 * Rate limiter for external API calls
 */
export class RateLimiter {
  private calls: Map<string, number[]> = new Map()

  constructor(
    private maxCalls: number = 10,
    private windowMs: number = 60000
  ) {}

  canMakeCall(key: string): boolean {
    const now = Date.now()
    const callTimes = this.calls.get(key) || []

    const recentCalls = callTimes.filter((time) => now - time < this.windowMs)
    this.calls.set(key, recentCalls)

    return recentCalls.length < this.maxCalls
  }

  recordCall(key: string): void {
    const now = Date.now()
    const callTimes = this.calls.get(key) || []
    callTimes.push(now)
    this.calls.set(key, callTimes)
  }

  getRemainingCalls(key: string): number {
    const now = Date.now()
    const callTimes = this.calls.get(key) || []
    const recentCalls = callTimes.filter((time) => now - time < this.windowMs)
    return Math.max(0, this.maxCalls - recentCalls.length)
  }

  getResetTime(key: string): Date | null {
    const callTimes = this.calls.get(key) || []
    if (callTimes.length === 0) return null

    const oldestCall = Math.min(...callTimes)
    return new Date(oldestCall + this.windowMs)
  }
}

/**
 * Retry with exponential backoff
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  operationName: string,
  maxRetries: number = 3,
  initialDelayMs: number = 1000
): Promise<T> {
  let lastError: Error | unknown

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error

      if (attempt < maxRetries) {
        const delayMs = initialDelayMs * Math.pow(2, attempt)
        logWarning('retryWithBackoff', `${operationName} failed, retrying in ${delayMs}ms`, {
          attempt: attempt + 1,
          maxRetries,
          error: error instanceof Error ? error.message : String(error),
        })
        await new Promise((resolve) => setTimeout(resolve, delayMs))
      }
    }
  }

  throw new FollowupProcessingError(
    `${operationName} failed after ${maxRetries} retries`,
    { lastError },
    false
  )
}

/**
 * Global instances for reuse
 */
export const globalCircuitBreaker = new CircuitBreaker(5, 60000)
export const globalRateLimiter = new RateLimiter(10, 60000)
