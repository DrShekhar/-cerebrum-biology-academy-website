import { Prisma } from '@/generated/prisma'

// Custom error classes for better error handling
export class DatabaseError extends Error {
  public readonly code: string
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(message: string, code: string, statusCode: number = 500) {
    super(message)
    this.name = 'DatabaseError'
    this.code = code
    this.statusCode = statusCode
    this.isOperational = true

    // Ensure proper prototype chain
    Object.setPrototypeOf(this, DatabaseError.prototype)
  }
}

export class ValidationError extends DatabaseError {
  constructor(message: string, field?: string) {
    super(message, 'VALIDATION_ERROR', 400)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends DatabaseError {
  constructor(resource: string, id?: string) {
    const message = id ? `${resource} with ID ${id} not found` : `${resource} not found`
    super(message, 'NOT_FOUND', 404)
    this.name = 'NotFoundError'
  }
}

export class ConflictError extends DatabaseError {
  constructor(message: string) {
    super(message, 'CONFLICT', 409)
    this.name = 'ConflictError'
  }
}

export class RateLimitError extends DatabaseError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 'RATE_LIMIT_EXCEEDED', 429)
    this.name = 'RateLimitError'
  }
}

// Error code mappings for Prisma errors
const PRISMA_ERROR_CODES = {
  P2002: 'UNIQUE_CONSTRAINT_VIOLATION',
  P2003: 'FOREIGN_KEY_CONSTRAINT_VIOLATION',
  P2004: 'CONSTRAINT_VIOLATION',
  P2005: 'INVALID_VALUE',
  P2006: 'INVALID_VALUE',
  P2007: 'DATA_VALIDATION_ERROR',
  P2008: 'QUERY_PARSING_ERROR',
  P2009: 'QUERY_VALIDATION_ERROR',
  P2010: 'RAW_QUERY_FAILED',
  P2011: 'NULL_CONSTRAINT_VIOLATION',
  P2012: 'MISSING_REQUIRED_VALUE',
  P2013: 'MISSING_REQUIRED_ARGUMENT',
  P2014: 'REQUIRED_RELATION_VIOLATION',
  P2015: 'RELATED_RECORD_NOT_FOUND',
  P2016: 'QUERY_INTERPRETATION_ERROR',
  P2017: 'RECORDS_NOT_CONNECTED',
  P2018: 'REQUIRED_CONNECTED_RECORDS_NOT_FOUND',
  P2019: 'INPUT_ERROR',
  P2020: 'VALUE_OUT_OF_RANGE',
  P2021: 'TABLE_NOT_EXISTS',
  P2022: 'COLUMN_NOT_EXISTS',
  P2023: 'INCONSISTENT_COLUMN_DATA',
  P2024: 'CONNECTION_TIMEOUT',
  P2025: 'RECORD_NOT_FOUND',
  P2026: 'UNSUPPORTED_FEATURE',
  P2027: 'QUERY_ENGINE_ERROR',
  P2028: 'TRANSACTION_API_ERROR',
  P2030: 'FULLTEXT_INDEX_NOT_FOUND',
  P2031: 'MONGODB_REPLICA_SET_REQUIRED',
  P2033: 'NUMBER_OUT_OF_RANGE',
  P2034: 'TRANSACTION_CONFLICT'
}

// User-friendly error messages
const USER_FRIENDLY_MESSAGES = {
  UNIQUE_CONSTRAINT_VIOLATION: 'This record already exists',
  FOREIGN_KEY_CONSTRAINT_VIOLATION: 'Related record not found',
  NULL_CONSTRAINT_VIOLATION: 'Required field is missing',
  RECORD_NOT_FOUND: 'Record not found',
  CONNECTION_TIMEOUT: 'Database connection timeout',
  TRANSACTION_CONFLICT: 'Operation failed due to concurrent modifications',
  VALIDATION_ERROR: 'Invalid input data',
  RATE_LIMIT_EXCEEDED: 'Too many requests, please try again later'
}

export class DatabaseErrorHandler {
  static handleError(error: any): DatabaseError {
    // Handle Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return this.handlePrismaKnownError(error)
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      return this.handlePrismaUnknownError(error)
    }

    if (error instanceof Prisma.PrismaClientRustPanicError) {
      return this.handlePrismaRustPanicError(error)
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
      return this.handlePrismaInitializationError(error)
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      return this.handlePrismaValidationError(error)
    }

    // Handle custom database errors
    if (error instanceof DatabaseError) {
      return error
    }

    // Handle generic errors
    return this.handleGenericError(error)
  }

  private static handlePrismaKnownError(error: Prisma.PrismaClientKnownRequestError): DatabaseError {
    const code = PRISMA_ERROR_CODES[error.code as keyof typeof PRISMA_ERROR_CODES] || 'UNKNOWN_ERROR'
    const userMessage = USER_FRIENDLY_MESSAGES[code as keyof typeof USER_FRIENDLY_MESSAGES] || error.message

    console.error('Prisma Known Error:', {
      code: error.code,
      message: error.message,
      meta: error.meta
    })

    switch (error.code) {
      case 'P2002':
        // Unique constraint violation
        const target = error.meta?.target as string[] || []
        const field = target.length > 0 ? target[0] : 'field'
        return new ConflictError(`${field.charAt(0).toUpperCase() + field.slice(1)} already exists`)

      case 'P2025':
        // Record not found
        return new NotFoundError('Record')

      case 'P2003':
      case 'P2004':
        // Foreign key / constraint violation
        return new ValidationError('Invalid reference to related record')

      case 'P2011':
      case 'P2012':
        // Null constraint / missing required value
        return new ValidationError('Required field is missing')

      case 'P2024':
        // Connection timeout
        return new DatabaseError('Database connection timeout', 'CONNECTION_TIMEOUT', 503)

      case 'P2034':
        // Transaction conflict
        return new DatabaseError('Operation failed due to concurrent modifications', 'TRANSACTION_CONFLICT', 409)

      default:
        return new DatabaseError(userMessage, code, 500)
    }
  }

  private static handlePrismaUnknownError(error: Prisma.PrismaClientUnknownRequestError): DatabaseError {
    console.error('Prisma Unknown Error:', error.message)
    return new DatabaseError('An unexpected database error occurred', 'UNKNOWN_DATABASE_ERROR', 500)
  }

  private static handlePrismaRustPanicError(error: Prisma.PrismaClientRustPanicError): DatabaseError {
    console.error('Prisma Rust Panic Error:', error.message)
    return new DatabaseError('Database engine error', 'DATABASE_ENGINE_ERROR', 500)
  }

  private static handlePrismaInitializationError(error: Prisma.PrismaClientInitializationError): DatabaseError {
    console.error('Prisma Initialization Error:', error.message)
    return new DatabaseError('Database connection failed', 'DATABASE_CONNECTION_FAILED', 503)
  }

  private static handlePrismaValidationError(error: Prisma.PrismaClientValidationError): DatabaseError {
    console.error('Prisma Validation Error:', error.message)
    return new ValidationError('Invalid query parameters')
  }

  private static handleGenericError(error: any): DatabaseError {
    console.error('Generic Error:', error)

    // Check for common Node.js errors
    if (error.code === 'ECONNREFUSED') {
      return new DatabaseError('Database connection refused', 'CONNECTION_REFUSED', 503)
    }

    if (error.code === 'ETIMEDOUT') {
      return new DatabaseError('Database operation timeout', 'OPERATION_TIMEOUT', 504)
    }

    if (error.code === 'ENOTFOUND') {
      return new DatabaseError('Database host not found', 'HOST_NOT_FOUND', 503)
    }

    return new DatabaseError(
      error.message || 'An unexpected error occurred',
      'UNKNOWN_ERROR',
      500
    )
  }

  // Retry logic for transient errors
  static shouldRetry(error: DatabaseError): boolean {
    const retryableCodes = [
      'CONNECTION_TIMEOUT',
      'CONNECTION_REFUSED',
      'OPERATION_TIMEOUT',
      'TRANSACTION_CONFLICT',
      'DATABASE_ENGINE_ERROR'
    ]

    return retryableCodes.includes(error.code)
  }

  // Get retry delay with exponential backoff
  static getRetryDelay(attempt: number, baseDelay: number = 1000): number {
    return Math.min(baseDelay * Math.pow(2, attempt - 1), 10000) // Max 10 seconds
  }

  // Log error for monitoring
  static logError(error: DatabaseError, context?: Record<string, any>): void {
    const logData = {
      error: {
        name: error.name,
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        stack: error.stack
      },
      context: context || {},
      timestamp: new Date().toISOString()
    }

    // In production, you might want to send this to a logging service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to logging service
      // logService.error(logData)
      console.error('Database Error:', JSON.stringify(logData, null, 2))
    } else {
      console.error('Database Error:', logData)
    }
  }
}

// Wrapper function for database operations with error handling and retry logic
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  context?: Record<string, any>
): Promise<T> {
  let lastError: DatabaseError
  let attempt = 1

  while (attempt <= maxRetries) {
    try {
      return await operation()
    } catch (error) {
      lastError = DatabaseErrorHandler.handleError(error)

      // Log the error
      DatabaseErrorHandler.logError(lastError, {
        ...context,
        attempt,
        maxRetries
      })

      // Don't retry if it's not a retryable error or if we've exhausted retries
      if (!DatabaseErrorHandler.shouldRetry(lastError) || attempt === maxRetries) {
        throw lastError
      }

      // Wait before retrying
      const delay = DatabaseErrorHandler.getRetryDelay(attempt)
      await new Promise(resolve => setTimeout(resolve, delay))

      attempt++
    }
  }

  throw lastError!
}

// Validation helpers
export class ValidationHelpers {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  static validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/
    return phoneRegex.test(phone)
  }

  static validatePassword(password: string): { isValid: boolean; message?: string } {
    if (password.length < 8) {
      return { isValid: false, message: 'Password must be at least 8 characters long' }
    }

    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one uppercase letter' }
    }

    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one lowercase letter' }
    }

    if (!/\d/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one number' }
    }

    return { isValid: true }
  }

  static validateObjectId(id: string): boolean {
    // Validate CUID format (used by Prisma)
    const cuidRegex = /^c[a-z0-9]{24}$/
    return cuidRegex.test(id)
  }

  static sanitizeInput(input: string): string {
    // Remove potentially dangerous characters
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/[<>]/g, '')
      .trim()
  }

  static validatePagination(page?: number, limit?: number): { page: number; limit: number } {
    const validPage = Math.max(1, Math.floor(page || 1))
    const validLimit = Math.min(100, Math.max(1, Math.floor(limit || 20)))

    return { page: validPage, limit: validLimit }
  }

  static validateSortOrder(order?: string): 'asc' | 'desc' {
    return order?.toLowerCase() === 'desc' ? 'desc' : 'asc'
  }
}

// Rate limiting helpers
export class RateLimitHelpers {
  private static readonly windows = new Map<string, { count: number; resetTime: number }>()

  static checkRateLimit(
    key: string,
    maxRequests: number,
    windowMs: number
  ): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now()
    const window = this.windows.get(key)

    if (!window || now > window.resetTime) {
      // New window or expired window
      this.windows.set(key, {
        count: 1,
        resetTime: now + windowMs
      })

      return {
        allowed: true,
        remaining: maxRequests - 1,
        resetTime: now + windowMs
      }
    }

    window.count++

    if (window.count > maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: window.resetTime
      }
    }

    return {
      allowed: true,
      remaining: maxRequests - window.count,
      resetTime: window.resetTime
    }
  }

  static cleanup(): void {
    const now = Date.now()
    for (const [key, window] of this.windows.entries()) {
      if (now > window.resetTime) {
        this.windows.delete(key)
      }
    }
  }
}

// Performance monitoring
export class PerformanceMonitor {
  private static readonly operations = new Map<string, {
    count: number
    totalTime: number
    errors: number
    lastReset: number
  }>()

  static startTimer(operationName: string): () => void {
    const startTime = Date.now()

    return () => {
      const duration = Date.now() - startTime
      this.recordOperation(operationName, duration, false)
    }
  }

  static recordOperation(name: string, duration: number, isError: boolean): void {
    const stats = this.operations.get(name) || {
      count: 0,
      totalTime: 0,
      errors: 0,
      lastReset: Date.now()
    }

    stats.count++
    stats.totalTime += duration
    if (isError) {
      stats.errors++
    }

    this.operations.set(name, stats)

    // Log slow operations in production
    if (process.env.NODE_ENV === 'production' && duration > 5000) {
      console.warn(`Slow database operation: ${name} took ${duration}ms`)
    }
  }

  static getStats(name?: string): Record<string, any> {
    if (name) {
      const stats = this.operations.get(name)
      if (!stats) return {}

      return {
        count: stats.count,
        averageTime: stats.count > 0 ? stats.totalTime / stats.count : 0,
        errorRate: stats.count > 0 ? (stats.errors / stats.count) * 100 : 0,
        totalTime: stats.totalTime
      }
    }

    const allStats: Record<string, any> = {}
    for (const [operationName, stats] of this.operations.entries()) {
      allStats[operationName] = {
        count: stats.count,
        averageTime: stats.count > 0 ? stats.totalTime / stats.count : 0,
        errorRate: stats.count > 0 ? (stats.errors / stats.count) * 100 : 0,
        totalTime: stats.totalTime
      }
    }

    return allStats
  }

  static reset(): void {
    this.operations.clear()
  }
}

export default DatabaseErrorHandler