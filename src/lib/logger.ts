/**
 * Unified Logger Export
 *
 * This file serves as the single entry point for logging across the application.
 * All logger imports should use: import { logger } from '@/lib/logger'
 *
 * DEPRECATED: Direct imports from @/lib/utils/logger or @/lib/monitoring/logger
 * Please migrate all imports to use this file instead.
 */

// Re-export the main logger from utils
export { logger, Logger, type LogLevelString, type LogEntry } from './utils/logger'
export { logger as default } from './utils/logger'

/**
 * Quick logging functions for convenience
 * Usage: import { log } from '@/lib/logger'
 *        log.info('Message', { data })
 */
import { logger as mainLogger } from './utils/logger'

export const log = {
  debug: (message: string, data?: any) => mainLogger.debug(message, data),
  info: (message: string, data?: any) => mainLogger.info(message, data),
  warn: (message: string, data?: any) => mainLogger.warn(message, data),
  error: (message: string, error?: unknown) => mainLogger.error(message, error),
}

/**
 * Create a child logger with additional context
 * Useful for module-specific logging
 *
 * Usage:
 *   const moduleLogger = createLogger({ module: 'payment' })
 *   moduleLogger.info('Processing payment')
 */
export function createLogger(context: Record<string, any>) {
  return mainLogger.child(context)
}

/**
 * Structured logging helpers for common operations
 */
export const structuredLog = {
  apiRequest: mainLogger.apiRequest.bind(mainLogger),
  apiResponse: mainLogger.apiResponse.bind(mainLogger),
  databaseQuery: mainLogger.databaseQuery.bind(mainLogger),
  authentication: mainLogger.authentication.bind(mainLogger),
  authorization: mainLogger.authorization.bind(mainLogger),
  rateLimitHit: mainLogger.rateLimitHit.bind(mainLogger),
  securityEvent: mainLogger.securityEvent.bind(mainLogger),
  performanceMetric: mainLogger.performanceMetric.bind(mainLogger),
  businessEvent: mainLogger.businessEvent.bind(mainLogger),
  payment: mainLogger.payment.bind(mainLogger),
  email: mainLogger.email.bind(mainLogger),
  webhook: mainLogger.webhook.bind(mainLogger),
  cache: mainLogger.cache.bind(mainLogger),
  queue: mainLogger.queue.bind(mainLogger),
  healthCheck: mainLogger.healthCheck.bind(mainLogger),
  externalService: mainLogger.externalService.bind(mainLogger),
  audit: mainLogger.audit.bind(mainLogger),
  trackError: mainLogger.trackError.bind(mainLogger),
}
