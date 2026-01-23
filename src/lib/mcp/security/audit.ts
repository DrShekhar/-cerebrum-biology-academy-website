/**
 * Audit Logger - Comprehensive Activity Tracking
 * Real-time audit logging for security and compliance
 * Educational interaction monitoring with privacy protection
 */

import Redis from 'ioredis'
import { AuditLog, UserType, AuditAction, AuditStatus } from '../types'

interface AuditConfiguration {
  enabledActions: AuditAction[]
  retentionDays: number
  enableRealTimeAlerts: boolean
  sensitiveDataMasking: boolean
  compressionEnabled: boolean
  batchSize: number
}

interface SecurityAlert {
  id: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  type: string
  message: string
  userId: string
  timestamp: Date
  details: any
  resolved: boolean
}

interface AuditQuery {
  userId?: string
  userType?: UserType
  action?: AuditAction
  status?: AuditStatus
  startDate?: Date
  endDate?: Date
  ipAddress?: string
  limit?: number
  offset?: number
}

interface AuditStatistics {
  totalEvents: number
  successfulEvents: number
  failedEvents: number
  uniqueUsers: number
  topActions: { action: AuditAction; count: number }[]
  topUsers: { userId: string; count: number }[]
  errorRate: number
  averageResponseTime: number
}

/**
 * AuditLogger provides comprehensive audit trail for all system activities
 * Features: Real-time logging, security alerts, compliance reporting, analytics
 */
export class AuditLogger {
  private redis: Redis
  private config: AuditConfiguration
  private auditBuffer: AuditLog[] = []
  private securityAlerts: SecurityAlert[] = []
  private isProcessingBatch = false

  // Audit metrics
  private eventCounter = 0
  private errorCounter = 0
  private lastBatchTime = Date.now()

  // Security thresholds
  private readonly SECURITY_THRESHOLDS = {
    failedLoginAttempts: 5,
    rapidRequestCount: 100, // requests per minute
    suspiciousIPActivity: 50, // requests per hour from single IP
    dataAccessVolume: 1000, // data access events per hour
  }

  constructor(redis: Redis, config?: Partial<AuditConfiguration>) {
    this.redis = redis
    this.config = {
      enabledActions: [
        AuditAction.LOGIN,
        AuditAction.LOGOUT,
        AuditAction.QUERY,
        AuditAction.PROGRESS_UPDATE,
        AuditAction.PAYMENT,
        AuditAction.DATA_ACCESS,
        AuditAction.CONFIGURATION_CHANGE,
      ],
      retentionDays: 365, // 1 year retention
      enableRealTimeAlerts: true,
      sensitiveDataMasking: true,
      compressionEnabled: true,
      batchSize: 100,
      ...config,
    }

    this.startBatchProcessor()
  }

  /**
   * Log user action with comprehensive details
   */
  async logAction(
    action: AuditAction,
    details: Record<string, any>,
    userId: string = 'system',
    userType: UserType = UserType.SYSTEM,
    ipAddress: string = 'localhost',
    userAgent: string = 'MCP-Server'
  ): Promise<void> {
    if (!this.config.enabledActions.includes(action)) {
      return // Action not enabled for logging
    }

    const auditLog: AuditLog = {
      id: this.generateAuditId(),
      timestamp: new Date(),
      userId,
      userType,
      action,
      resource: details.resource || 'mcp-server',
      details: this.config.sensitiveDataMasking ? this.maskSensitiveData(details) : details,
      ipAddress,
      userAgent,
      status: AuditStatus.SUCCESS,
    }

    // Add to buffer for batch processing
    this.auditBuffer.push(auditLog)
    this.eventCounter++

    // Check for security alerts
    if (this.config.enableRealTimeAlerts) {
      await this.checkSecurityThresholds(auditLog)
    }

    // Process batch if buffer is full
    if (this.auditBuffer.length >= this.config.batchSize) {
      await this.processBatch()
    }
  }

  /**
   * Log error events for security monitoring
   */
  async logError(
    errorType: string,
    error: any,
    userId: string = 'system',
    userType: UserType = UserType.SYSTEM,
    ipAddress: string = 'localhost',
    userAgent: string = 'MCP-Server'
  ): Promise<void> {
    this.errorCounter++

    const auditLog: AuditLog = {
      id: this.generateAuditId(),
      timestamp: new Date(),
      userId,
      userType,
      action: AuditAction.DATA_ACCESS, // Generic action for errors
      resource: 'error_handler',
      details: {
        errorType,
        errorMessage: error.message || error,
        errorStack: error.stack,
        ...this.extractErrorContext(error),
      },
      ipAddress,
      userAgent,
      status: AuditStatus.FAILURE,
    }

    // Errors get immediate processing
    await this.storeAuditLog(auditLog)

    // Create security alert for critical errors
    if (this.isCriticalError(errorType)) {
      await this.createSecurityAlert('critical', 'system_error', error.message, userId, {
        errorType,
        auditId: auditLog.id,
      })
    }
  }

  /**
   * Log educational interaction for learning analytics
   */
  async logEducationalInteraction(
    studentId: string,
    interactionType: string,
    content: any,
    result: any,
    duration: number = 0
  ): Promise<void> {
    await this.logAction(
      AuditAction.QUERY,
      {
        resource: 'educational_interaction',
        interactionType,
        content: this.summarizeContent(content),
        result: this.summarizeResult(result),
        duration,
        timestamp: new Date(),
      },
      studentId,
      UserType.STUDENT
    )
  }

  /**
   * Query audit logs with filters
   */
  async queryAuditLogs(query: AuditQuery): Promise<{
    logs: AuditLog[]
    total: number
    hasMore: boolean
  }> {
    const limit = query.limit || 100
    const offset = query.offset || 0

    // Build Redis search pattern
    const searchPattern = this.buildSearchPattern(query)

    try {
      // Get matching log IDs
      const logIds = await this.redis.keys(searchPattern)

      // Apply additional filters and pagination
      const filteredIds = await this.applyAdvancedFilters(logIds, query)
      const paginatedIds = filteredIds.slice(offset, offset + limit)

      // Fetch log details
      const logs = await this.fetchLogDetails(paginatedIds)

      return {
        logs,
        total: filteredIds.length,
        hasMore: offset + limit < filteredIds.length,
      }
    } catch (error) {
      await this.logError('audit_query_failed', error)
      return { logs: [], total: 0, hasMore: false }
    }
  }

  /**
   * Generate audit statistics and analytics
   */
  async generateStatistics(
    startDate: Date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: Date = new Date()
  ): Promise<AuditStatistics> {
    try {
      const query: AuditQuery = { startDate, endDate }
      const { logs, total } = await this.queryAuditLogs(query)

      const successfulEvents = logs.filter((log) => log.status === AuditStatus.SUCCESS).length
      const failedEvents = logs.filter((log) => log.status === AuditStatus.FAILURE).length
      const uniqueUsers = new Set(logs.map((log) => log.userId)).size

      // Calculate top actions
      const actionCounts = new Map<AuditAction, number>()
      logs.forEach((log) => {
        actionCounts.set(log.action, (actionCounts.get(log.action) || 0) + 1)
      })

      const topActions = Array.from(actionCounts.entries())
        .map(([action, count]) => ({ action, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)

      // Calculate top users
      const userCounts = new Map<string, number>()
      logs.forEach((log) => {
        userCounts.set(log.userId, (userCounts.get(log.userId) || 0) + 1)
      })

      const topUsers = Array.from(userCounts.entries())
        .map(([userId, count]) => ({ userId, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)

      return {
        totalEvents: total,
        successfulEvents,
        failedEvents,
        uniqueUsers,
        topActions,
        topUsers,
        errorRate: total > 0 ? (failedEvents / total) * 100 : 0,
        averageResponseTime: this.calculateAverageResponseTime(logs),
      }
    } catch (error) {
      await this.logError('statistics_generation_failed', error)
      return this.getDefaultStatistics()
    }
  }

  /**
   * Get security alerts
   */
  getSecurityAlerts(severity?: SecurityAlert['severity']): SecurityAlert[] {
    if (severity) {
      return this.securityAlerts.filter((alert) => alert.severity === severity)
    }
    return [...this.securityAlerts]
  }

  /**
   * Resolve security alert
   */
  async resolveSecurityAlert(alertId: string, resolution: string): Promise<boolean> {
    const alert = this.securityAlerts.find((a) => a.id === alertId)
    if (!alert) return false

    alert.resolved = true

    await this.logAction(
      AuditAction.CONFIGURATION_CHANGE,
      {
        resource: 'security_alert',
        action: 'resolved',
        alertId,
        resolution,
      },
      'admin',
      UserType.ADMIN
    )

    return true
  }

  /**
   * Export audit logs for compliance reporting
   */
  async exportAuditLogs(query: AuditQuery, format: 'json' | 'csv' = 'json'): Promise<string> {
    const { logs } = await this.queryAuditLogs({ ...query, limit: 10000 })

    if (format === 'csv') {
      return this.convertLogsToCSV(logs)
    }

    return JSON.stringify(logs, null, 2)
  }

  /**
   * Clean up old audit logs based on retention policy
   */
  async cleanupOldLogs(): Promise<number> {
    const cutoffDate = new Date(Date.now() - this.config.retentionDays * 24 * 60 * 60 * 1000)
    const oldLogPattern = `audit:*`

    try {
      const allLogIds = await this.redis.keys(oldLogPattern)
      let deletedCount = 0

      for (const logId of allLogIds) {
        const logData = await this.redis.get(logId)
        if (logData) {
          const log: AuditLog = JSON.parse(logData)
          if (log.timestamp < cutoffDate) {
            await this.redis.del(logId)
            deletedCount++
          }
        }
      }

      await this.logAction(AuditAction.CONFIGURATION_CHANGE, {
        resource: 'audit_cleanup',
        deletedCount,
        cutoffDate: cutoffDate.toISOString(),
      })

      return deletedCount
    } catch (error) {
      await this.logError('audit_cleanup_failed', error)
      return 0
    }
  }

  // Private helper methods

  private async processBatch(): Promise<void> {
    if (this.isProcessingBatch || this.auditBuffer.length === 0) {
      return
    }

    this.isProcessingBatch = true

    try {
      const batch = [...this.auditBuffer]
      this.auditBuffer = []

      // Store batch in Redis
      const pipeline = this.redis.pipeline()

      for (const log of batch) {
        const key = `audit:${log.id}`
        const value = JSON.stringify(log)

        pipeline.setex(key, this.config.retentionDays * 24 * 60 * 60, value)

        // Create index entries for efficient querying
        pipeline.sadd(`audit:user:${log.userId}`, log.id)
        pipeline.sadd(`audit:action:${log.action}`, log.id)
        pipeline.sadd(`audit:date:${this.getDateKey(log.timestamp)}`, log.id)
      }

      await pipeline.exec()

      this.lastBatchTime = Date.now()
    } catch (error) {
      // Put logs back in buffer for retry
      this.auditBuffer.unshift(...this.auditBuffer)
      await this.logError('batch_processing_failed', error)
    } finally {
      this.isProcessingBatch = false
    }
  }

  private async storeAuditLog(log: AuditLog): Promise<void> {
    const key = `audit:${log.id}`
    const value = JSON.stringify(log)

    await this.redis.setex(key, this.config.retentionDays * 24 * 60 * 60, value)

    // Create index entries
    await this.redis.sadd(`audit:user:${log.userId}`, log.id)
    await this.redis.sadd(`audit:action:${log.action}`, log.id)
    await this.redis.sadd(`audit:date:${this.getDateKey(log.timestamp)}`, log.id)
  }

  private async checkSecurityThresholds(log: AuditLog): Promise<void> {
    // Check failed login attempts
    if (log.action === AuditAction.LOGIN && log.status === AuditStatus.FAILURE) {
      const recentFailures = await this.countRecentEvents(
        log.userId,
        AuditAction.LOGIN,
        AuditStatus.FAILURE,
        15 * 60 * 1000 // 15 minutes
      )

      if (recentFailures >= this.SECURITY_THRESHOLDS.failedLoginAttempts) {
        await this.createSecurityAlert(
          'high',
          'repeated_login_failures',
          `${recentFailures} failed login attempts in 15 minutes`,
          log.userId,
          { failureCount: recentFailures }
        )
      }
    }

    // Check rapid request patterns
    const recentRequests = await this.countRecentEvents(
      log.userId,
      undefined, // any action
      undefined, // any status
      60 * 1000 // 1 minute
    )

    if (recentRequests >= this.SECURITY_THRESHOLDS.rapidRequestCount) {
      await this.createSecurityAlert(
        'medium',
        'rapid_requests',
        `${recentRequests} requests in 1 minute`,
        log.userId,
        { requestCount: recentRequests }
      )
    }

    // Check suspicious IP activity
    const ipRequests = await this.countRecentEventsByIP(
      log.ipAddress,
      60 * 60 * 1000 // 1 hour
    )

    if (ipRequests >= this.SECURITY_THRESHOLDS.suspiciousIPActivity) {
      await this.createSecurityAlert(
        'high',
        'suspicious_ip_activity',
        `${ipRequests} requests from IP in 1 hour`,
        log.userId,
        { ipAddress: log.ipAddress, requestCount: ipRequests }
      )
    }
  }

  private async createSecurityAlert(
    severity: SecurityAlert['severity'],
    type: string,
    message: string,
    userId: string,
    details: any
  ): Promise<void> {
    const alert: SecurityAlert = {
      id: this.generateAlertId(),
      severity,
      type,
      message,
      userId,
      timestamp: new Date(),
      details,
      resolved: false,
    }

    this.securityAlerts.push(alert)

    // Keep only last 1000 alerts to prevent memory issues
    if (this.securityAlerts.length > 1000) {
      this.securityAlerts = this.securityAlerts.slice(-500)
    }

    // Store alert in Redis
    await this.redis.setex(
      `security_alert:${alert.id}`,
      7 * 24 * 60 * 60, // 7 days
      JSON.stringify(alert)
    )

    console.warn(`🚨 Security Alert [${severity.toUpperCase()}]: ${message}`, {
      type,
      userId,
      details,
    })
  }

  private startBatchProcessor(): void {
    // Process batch every 30 seconds
    setInterval(async () => {
      if (this.auditBuffer.length > 0) {
        await this.processBatch()
      }
    }, 30000)

    // Force process on large buffer
    setInterval(async () => {
      if (this.auditBuffer.length >= this.config.batchSize * 2) {
        await this.processBatch()
      }
    }, 5000)
  }

  private maskSensitiveData(data: any): any {
    const sensitiveFields = ['password', 'token', 'secret', 'key', 'email', 'phone']
    const masked = { ...data }

    for (const field of sensitiveFields) {
      if (masked[field]) {
        masked[field] = this.maskString(masked[field])
      }
    }

    return masked
  }

  private maskString(value: string): string {
    if (typeof value !== 'string' || value.length < 4) return '***'

    const visibleChars = 2
    const start = value.substring(0, visibleChars)
    const end = value.substring(value.length - visibleChars)
    const masked = '*'.repeat(Math.max(0, value.length - visibleChars * 2))

    return `${start}${masked}${end}`
  }

  private extractErrorContext(error: any): any {
    return {
      name: error.name,
      code: error.code,
      statusCode: error.statusCode,
      timestamp: new Date(),
    }
  }

  private isCriticalError(errorType: string): boolean {
    const criticalErrors = [
      'authentication_failed',
      'authorization_failed',
      'data_breach',
      'security_violation',
      'system_compromise',
    ]

    return criticalErrors.includes(errorType)
  }

  private summarizeContent(content: any): any {
    if (typeof content === 'string') {
      return { type: 'text', length: content.length, preview: content.substring(0, 100) }
    }

    return { type: typeof content, keys: Object.keys(content || {}).length }
  }

  private summarizeResult(result: any): any {
    if (result && result.success !== undefined) {
      return { success: result.success, hasData: !!result.data }
    }

    return { type: typeof result }
  }

  private buildSearchPattern(query: AuditQuery): string {
    // Simple pattern matching - in production, use more sophisticated search
    return 'audit:*'
  }

  private async applyAdvancedFilters(logIds: string[], query: AuditQuery): Promise<string[]> {
    // Apply filters that can't be done with Redis patterns
    const filtered: string[] = []

    for (const logId of logIds) {
      const logData = await this.redis.get(logId)
      if (!logData) continue

      const log: AuditLog = JSON.parse(logData)

      // Apply filters
      if (query.userId && log.userId !== query.userId) continue
      if (query.userType && log.userType !== query.userType) continue
      if (query.action && log.action !== query.action) continue
      if (query.status && log.status !== query.status) continue
      if (query.startDate && log.timestamp < query.startDate) continue
      if (query.endDate && log.timestamp > query.endDate) continue
      if (query.ipAddress && log.ipAddress !== query.ipAddress) continue

      filtered.push(logId)
    }

    return filtered.sort().reverse() // Most recent first
  }

  private async fetchLogDetails(logIds: string[]): Promise<AuditLog[]> {
    const logs: AuditLog[] = []

    for (const logId of logIds) {
      const logData = await this.redis.get(logId)
      if (logData) {
        logs.push(JSON.parse(logData))
      }
    }

    return logs
  }

  private async countRecentEvents(
    userId: string,
    action?: AuditAction,
    status?: AuditStatus,
    timeWindow: number = 60000
  ): Promise<number> {
    const userLogIds = await this.redis.smembers(`audit:user:${userId}`)
    let count = 0
    const cutoffTime = new Date(Date.now() - timeWindow)

    for (const logId of userLogIds.slice(-100)) {
      // Check last 100 events
      const logData = await this.redis.get(`audit:${logId}`)
      if (!logData) continue

      const log: AuditLog = JSON.parse(logData)

      if (log.timestamp < cutoffTime) continue
      if (action && log.action !== action) continue
      if (status && log.status !== status) continue

      count++
    }

    return count
  }

  private async countRecentEventsByIP(ipAddress: string, timeWindow: number): Promise<number> {
    // Simplified implementation - in production, maintain IP index
    return 0
  }

  private calculateAverageResponseTime(logs: AuditLog[]): number {
    const responseTimes = logs
      .map((log) => log.details?.responseTime)
      .filter((time) => typeof time === 'number')

    if (responseTimes.length === 0) return 0

    return responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length
  }

  private convertLogsToCSV(logs: AuditLog[]): string {
    const headers = [
      'id',
      'timestamp',
      'userId',
      'userType',
      'action',
      'resource',
      'status',
      'ipAddress',
    ]
    const csvRows = [headers.join(',')]

    for (const log of logs) {
      const row = [
        log.id,
        log.timestamp.toISOString(),
        log.userId,
        log.userType,
        log.action,
        log.resource,
        log.status,
        log.ipAddress,
      ]
      csvRows.push(row.join(','))
    }

    return csvRows.join('\n')
  }

  private getDefaultStatistics(): AuditStatistics {
    return {
      totalEvents: 0,
      successfulEvents: 0,
      failedEvents: 0,
      uniqueUsers: 0,
      topActions: [],
      topUsers: [],
      errorRate: 0,
      averageResponseTime: 0,
    }
  }

  private generateAuditId(): string {
    return `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private generateAlertId(): string {
    return `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private getDateKey(timestamp: Date): string {
    return timestamp.toISOString().split('T')[0] // YYYY-MM-DD
  }
}
