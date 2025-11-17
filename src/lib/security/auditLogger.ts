// Security audit logging system for Cerebrum Biology Academy
// This module provides comprehensive logging of security events

export interface SecurityEvent {
  eventType:
    | 'login'
    | 'logout'
    | 'admin_access'
    | 'failed_login'
    | 'rate_limit_exceeded'
    | 'password_change'
    | 'account_locked'
    | 'suspicious_activity'
  userId?: string
  userEmail?: string
  userRole?: string
  ipAddress: string
  userAgent: string
  timestamp: Date
  details: Record<string, any>
  severity: 'low' | 'medium' | 'high' | 'critical'
  location?: {
    pathname: string
    query?: Record<string, string>
    referrer?: string
  }
}

export class SecurityAuditLogger {
  private events: SecurityEvent[] = []
  private maxEvents = 10000 // Keep last 10k events in memory

  // Log a security event
  public logEvent(event: Omit<SecurityEvent, 'timestamp'>): void {
    const securityEvent: SecurityEvent = {
      ...event,
      timestamp: new Date(),
    }

    // Add to in-memory store
    this.events.push(securityEvent)

    // Trim to max events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents)
    }

    // Log to console based on severity
    this.logToConsole(securityEvent)

    // In production, this should also log to:
    // - Database for permanent storage
    // - External security monitoring service
    // - Alert system for critical events
    if (process.env.NODE_ENV === 'production') {
      this.logToProduction(securityEvent)
    }
  }

  // Console logging with color coding
  private logToConsole(event: SecurityEvent): void {
    const timestamp = event.timestamp.toISOString()
    const baseMessage = `[${timestamp}] ${event.eventType.toUpperCase()}`

    switch (event.severity) {
      case 'critical':
        console.error(`🚨 ${baseMessage}:`, event)
        break
      case 'high':
        console.warn(`⚠️  ${baseMessage}:`, event)
        break
      case 'medium':
        console.log(`📋 ${baseMessage}:`, event)
        break
      case 'low':
        console.debug(`📝 ${baseMessage}:`, event)
        break
    }
  }

  // Production logging with database persistence
  private async logToProduction(event: SecurityEvent): Promise<void> {
    try {
      // Log to database for permanent storage
      await this.logToDatabase(event)

      // Send to external monitoring service (Sentry)
      await this.sendToMonitoring(event)

      // Send alerts for critical events
      if (event.severity === 'critical') {
        await this.sendCriticalAlert(event)
      }
    } catch (error) {
      console.error('Failed to log security event to production systems:', error)
    }
  }

  // Log security event to database
  private async logToDatabase(event: SecurityEvent): Promise<void> {
    try {
      const { default: prisma } = await import('@/lib/prisma')

      await prisma.security_audit_logs.create({
        data: {
          eventType: event.eventType as any,
          userId: event.userId || null,
          userEmail: event.userEmail || null,
          userRole: event.userRole || null,
          ipAddress: event.ipAddress,
          userAgent: event.userAgent,
          severity: event.severity as any,
          pathname: event.location?.pathname || null,
          query: event.location?.query || null,
          referrer: event.location?.referrer || null,
          details: event.details,
          timestamp: event.timestamp,
        },
      })
    } catch (error) {
      // Silently fail database logging to prevent disruption
      console.error('Database logging failed:', error)
    }
  }

  // Send to external monitoring (Sentry integration)
  private async sendToMonitoring(event: SecurityEvent): Promise<void> {
    try {
      if (typeof window === 'undefined') {
        // Server-side: Use Sentry if available
        const Sentry = await import('@sentry/nextjs').catch(() => null)
        if (Sentry) {
          Sentry.captureMessage(`Security Event: ${event.eventType}`, {
            level: event.severity === 'critical' ? 'error' : 'warning',
            extra: event,
            tags: {
              securityEvent: event.eventType,
              severity: event.severity,
              userRole: event.userRole,
            },
          })
        }
      }
    } catch (error) {
      console.error('Monitoring service logging failed:', error)
    }
  }

  // Send critical alerts
  private async sendCriticalAlert(event: SecurityEvent): Promise<void> {
    try {
      // Log critical events with maximum visibility
      console.error('🚨 CRITICAL SECURITY EVENT 🚨', {
        type: event.eventType,
        user: event.userEmail,
        ip: event.ipAddress,
        details: event.details,
        timestamp: event.timestamp,
      })

      // In production, this could:
      // - Send email to security team
      // - Trigger PagerDuty/OpsGenie alert
      // - Send Slack notification to security channel
      // - Log to dedicated security monitoring platform
    } catch (error) {
      console.error('Critical alert failed:', error)
    }
  }

  // Get recent events for admin dashboard
  public getRecentEvents(limit = 100): SecurityEvent[] {
    return this.events.slice(-limit).reverse()
  }

  // Get events by severity
  public getEventsBySeverity(severity: SecurityEvent['severity'], limit = 100): SecurityEvent[] {
    return this.events
      .filter((event) => event.severity === severity)
      .slice(-limit)
      .reverse()
  }

  // Get events by type
  public getEventsByType(eventType: SecurityEvent['eventType'], limit = 100): SecurityEvent[] {
    return this.events
      .filter((event) => event.eventType === eventType)
      .slice(-limit)
      .reverse()
  }

  // Get events for specific user
  public getEventsForUser(userEmail: string, limit = 100): SecurityEvent[] {
    return this.events
      .filter((event) => event.userEmail === userEmail)
      .slice(-limit)
      .reverse()
  }

  // Get suspicious activity indicators
  public getSuspiciousActivity(): {
    repeatedFailedLogins: SecurityEvent[]
    multipleIPLogins: SecurityEvent[]
    rateLimitExceeded: SecurityEvent[]
    adminAccessFromNewIP: SecurityEvent[]
  } {
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const recentEvents = this.events.filter((event) => event.timestamp > last24Hours)

    // Failed logins from same IP
    const failedLogins = recentEvents.filter((event) => event.eventType === 'failed_login')
    const repeatedFailedLogins = this.groupByIP(failedLogins)
      .filter((group) => group.events.length >= 5)
      .flatMap((group) => group.events)

    // Multiple IP logins for same user
    const logins = recentEvents.filter((event) => event.eventType === 'login')
    const multipleIPLogins = this.groupByUser(logins)
      .filter((group) => new Set(group.events.map((e) => e.ipAddress)).size > 3)
      .flatMap((group) => group.events)

    // Rate limit exceeded events
    const rateLimitExceeded = recentEvents.filter(
      (event) => event.eventType === 'rate_limit_exceeded'
    )

    // Admin access from new IPs
    const adminAccess = recentEvents.filter(
      (event) => event.eventType === 'admin_access' && event.userRole === 'admin'
    )
    const adminAccessFromNewIP = this.identifyNewIPLogins(adminAccess)

    return {
      repeatedFailedLogins,
      multipleIPLogins,
      rateLimitExceeded,
      adminAccessFromNewIP,
    }
  }

  // Helper methods
  private groupByIP(events: SecurityEvent[]): { ip: string; events: SecurityEvent[] }[] {
    const groups = new Map<string, SecurityEvent[]>()
    events.forEach((event) => {
      const existing = groups.get(event.ipAddress) || []
      groups.set(event.ipAddress, [...existing, event])
    })
    return Array.from(groups.entries()).map(([ip, events]) => ({ ip, events }))
  }

  private groupByUser(events: SecurityEvent[]): { user: string; events: SecurityEvent[] }[] {
    const groups = new Map<string, SecurityEvent[]>()
    events.forEach((event) => {
      if (event.userEmail) {
        const existing = groups.get(event.userEmail) || []
        groups.set(event.userEmail, [...existing, event])
      }
    })
    return Array.from(groups.entries()).map(([user, events]) => ({ user, events }))
  }

  private identifyNewIPLogins(events: SecurityEvent[]): SecurityEvent[] {
    // This is a simplified implementation
    // In production, you'd compare against historical IP data
    const ipCounts = new Map<string, number>()
    events.forEach((event) => {
      ipCounts.set(event.ipAddress, (ipCounts.get(event.ipAddress) || 0) + 1)
    })

    return events.filter((event) => ipCounts.get(event.ipAddress) === 1)
  }

  // Security metrics for dashboard
  public getSecurityMetrics(): {
    totalEvents: number
    criticalEvents: number
    failedLogins: number
    successfulLogins: number
    adminAccess: number
    suspiciousActivityCount: number
    last24HourEvents: number
  } {
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const recentEvents = this.events.filter((event) => event.timestamp > last24Hours)

    return {
      totalEvents: this.events.length,
      criticalEvents: this.events.filter((e) => e.severity === 'critical').length,
      failedLogins: this.events.filter((e) => e.eventType === 'failed_login').length,
      successfulLogins: this.events.filter((e) => e.eventType === 'login').length,
      adminAccess: this.events.filter((e) => e.eventType === 'admin_access').length,
      suspiciousActivityCount: Object.values(this.getSuspiciousActivity()).flat().length,
      last24HourEvents: recentEvents.length,
    }
  }
}

// Singleton instance
export const securityAuditLogger = new SecurityAuditLogger()

// Helper functions for common logging scenarios
export const logLogin = (
  userEmail: string,
  userRole: string,
  ipAddress: string,
  userAgent: string
) => {
  securityAuditLogger.logEvent({
    eventType: 'login',
    userEmail,
    userRole,
    ipAddress,
    userAgent,
    severity: 'low',
    details: { action: 'successful_login' },
  })
}

export const logFailedLogin = (
  email: string,
  ipAddress: string,
  userAgent: string,
  reason: string
) => {
  securityAuditLogger.logEvent({
    eventType: 'failed_login',
    userEmail: email,
    ipAddress,
    userAgent,
    severity: 'medium',
    details: { reason, action: 'failed_login_attempt' },
  })
}

export const logAdminAccess = (
  userEmail: string,
  pathname: string,
  ipAddress: string,
  userAgent: string
) => {
  securityAuditLogger.logEvent({
    eventType: 'admin_access',
    userEmail,
    userRole: 'admin',
    ipAddress,
    userAgent,
    severity: 'high',
    details: { action: 'admin_route_access' },
    location: { pathname },
  })
}

export const logRateLimitExceeded = (ipAddress: string, userAgent: string, endpoint: string) => {
  securityAuditLogger.logEvent({
    eventType: 'rate_limit_exceeded',
    ipAddress,
    userAgent,
    severity: 'high',
    details: { endpoint, action: 'rate_limit_violation' },
  })
}

export const logSuspiciousActivity = (
  description: string,
  ipAddress: string,
  userAgent: string,
  details: Record<string, any>
) => {
  securityAuditLogger.logEvent({
    eventType: 'suspicious_activity',
    ipAddress,
    userAgent,
    severity: 'critical',
    details: { description, ...details },
  })
}
