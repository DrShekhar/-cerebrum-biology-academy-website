/**
 * Custom Analytics System
 *
 * Tracks business-specific metrics and generates insights.
 * Stores data in database for detailed analysis and reporting.
 */

import { logger } from '../monitoring/logger'

export interface AnalyticsEvent {
  type: string
  userId?: string
  sessionId?: string
  metadata: Record<string, any>
  timestamp: Date
}

export interface AIUsageMetrics {
  totalQuestions: number
  totalTokens: number
  totalCost: number
  avgResponseTime: number
  topTopics: Array<{ topic: string; count: number }>
}

export interface ConversionMetrics {
  demoBookings: number
  enrollments: number
  conversionRate: number
  avgTimeToConversion: number
}

export interface BusinessInsights {
  period: string
  aiUsage: AIUsageMetrics
  conversions: ConversionMetrics
  revenue: {
    total: number
    bySource: Record<string, number>
  }
  userEngagement: {
    activeUsers: number
    avgSessionDuration: number
    returnRate: number
  }
}

class CustomAnalytics {
  private events: AnalyticsEvent[] = []
  private maxEvents = 10000

  /**
   * Log an analytics event
   */
  async logEvent(event: Omit<AnalyticsEvent, 'timestamp'>): Promise<void> {
    const fullEvent: AnalyticsEvent = {
      ...event,
      timestamp: new Date(),
    }

    // Store in memory
    this.events.push(fullEvent)

    // Limit memory usage
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents / 2)
    }

    // In production, store in database
    if (process.env.NODE_ENV === 'production') {
      await this.storeInDatabase(fullEvent)
    }

    logger.debug('Analytics event logged:', fullEvent)
  }

  /**
   * Track AI usage
   */
  async trackAIUsage(params: {
    userId: string
    type: 'tutor' | 'test_generator' | 'whatsapp'
    topic?: string
    tokensUsed: number
    cost: number
    responseTime: number
  }): Promise<void> {
    await this.logEvent({
      type: 'ai_usage',
      userId: params.userId,
      metadata: {
        aiType: params.type,
        topic: params.topic,
        tokensUsed: params.tokensUsed,
        cost: params.cost,
        responseTime: params.responseTime,
      },
    })
  }

  /**
   * Track test performance
   */
  async trackTestPerformance(params: {
    userId: string
    testId: string
    score: number
    totalQuestions: number
    timeTaken: number
    topics: string[]
  }): Promise<void> {
    await this.logEvent({
      type: 'test_performance',
      userId: params.userId,
      metadata: params,
    })
  }

  /**
   * Track conversion funnel step
   */
  async trackConversionStep(params: {
    userId?: string
    step: 'landing' | 'demo_request' | 'demo_attended' | 'payment' | 'enrolled'
    source: string
    metadata?: Record<string, any>
  }): Promise<void> {
    await this.logEvent({
      type: 'conversion_funnel',
      userId: params.userId,
      metadata: {
        step: params.step,
        source: params.source,
        ...params.metadata,
      },
    })
  }

  /**
   * Track WhatsApp engagement
   */
  async trackWhatsAppEngagement(params: {
    phoneNumber: string
    eventType: 'message_received' | 'message_sent' | 'demo_booked' | 'question_asked'
    metadata?: Record<string, any>
  }): Promise<void> {
    await this.logEvent({
      type: 'whatsapp_engagement',
      userId: params.phoneNumber,
      metadata: {
        eventType: params.eventType,
        ...params.metadata,
      },
    })
  }

  /**
   * Track user session
   */
  async trackSession(params: {
    userId?: string
    sessionId: string
    duration: number
    pagesViewed: number
    actions: string[]
  }): Promise<void> {
    await this.logEvent({
      type: 'user_session',
      userId: params.userId,
      sessionId: params.sessionId,
      metadata: {
        duration: params.duration,
        pagesViewed: params.pagesViewed,
        actions: params.actions,
      },
    })
  }

  /**
   * Get AI usage metrics
   */
  getAIUsageMetrics(periodDays: number = 30): AIUsageMetrics {
    const cutoffDate = new Date(Date.now() - periodDays * 24 * 60 * 60 * 1000)
    const aiEvents = this.events.filter((e) => e.type === 'ai_usage' && e.timestamp >= cutoffDate)

    const totalQuestions = aiEvents.length
    const totalTokens = aiEvents.reduce((sum, e) => sum + (e.metadata.tokensUsed || 0), 0)
    const totalCost = aiEvents.reduce((sum, e) => sum + (e.metadata.cost || 0), 0)
    const avgResponseTime =
      aiEvents.length > 0
        ? aiEvents.reduce((sum, e) => sum + (e.metadata.responseTime || 0), 0) / aiEvents.length
        : 0

    // Calculate top topics
    const topicCounts: Record<string, number> = {}
    aiEvents.forEach((e) => {
      const topic = e.metadata.topic
      if (topic) {
        topicCounts[topic] = (topicCounts[topic] || 0) + 1
      }
    })

    const topTopics = Object.entries(topicCounts)
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    return {
      totalQuestions,
      totalTokens,
      totalCost,
      avgResponseTime,
      topTopics,
    }
  }

  /**
   * Get conversion metrics
   */
  getConversionMetrics(periodDays: number = 30): ConversionMetrics {
    const cutoffDate = new Date(Date.now() - periodDays * 24 * 60 * 60 * 1000)
    const conversionEvents = this.events.filter(
      (e) => e.type === 'conversion_funnel' && e.timestamp >= cutoffDate
    )

    const demoBookings = conversionEvents.filter((e) => e.metadata.step === 'demo_request').length

    const enrollments = conversionEvents.filter((e) => e.metadata.step === 'enrolled').length

    const conversionRate = demoBookings > 0 ? (enrollments / demoBookings) * 100 : 0

    // Calculate average time to conversion
    const userJourneys: Record<string, Date[]> = {}
    conversionEvents.forEach((e) => {
      if (e.userId) {
        if (!userJourneys[e.userId]) {
          userJourneys[e.userId] = []
        }
        userJourneys[e.userId].push(e.timestamp)
      }
    })

    const conversionTimes: number[] = []
    Object.values(userJourneys).forEach((timestamps) => {
      if (timestamps.length >= 2) {
        const sorted = timestamps.sort((a, b) => a.getTime() - b.getTime())
        const timeToConversion = sorted[sorted.length - 1].getTime() - sorted[0].getTime()
        conversionTimes.push(timeToConversion)
      }
    })

    const avgTimeToConversion =
      conversionTimes.length > 0
        ? conversionTimes.reduce((sum, time) => sum + time, 0) /
          conversionTimes.length /
          (1000 * 60 * 60 * 24) // in days
        : 0

    return {
      demoBookings,
      enrollments,
      conversionRate,
      avgTimeToConversion,
    }
  }

  /**
   * Get business insights
   */
  getBusinessInsights(periodDays: number = 30): BusinessInsights {
    const aiUsage = this.getAIUsageMetrics(periodDays)
    const conversions = this.getConversionMetrics(periodDays)

    const cutoffDate = new Date(Date.now() - periodDays * 24 * 60 * 60 * 1000)
    const sessionEvents = this.events.filter(
      (e) => e.type === 'user_session' && e.timestamp >= cutoffDate
    )

    const uniqueUsers = new Set(sessionEvents.map((e) => e.userId).filter(Boolean)).size
    const avgSessionDuration =
      sessionEvents.length > 0
        ? sessionEvents.reduce((sum, e) => sum + (e.metadata.duration || 0), 0) /
          sessionEvents.length
        : 0

    // Calculate return rate
    const userSessions: Record<string, number> = {}
    sessionEvents.forEach((e) => {
      if (e.userId) {
        userSessions[e.userId] = (userSessions[e.userId] || 0) + 1
      }
    })
    const returningUsers = Object.values(userSessions).filter((count) => count > 1).length
    const returnRate = uniqueUsers > 0 ? (returningUsers / uniqueUsers) * 100 : 0

    return {
      period: `Last ${periodDays} days`,
      aiUsage,
      conversions,
      revenue: {
        total: conversions.enrollments * 75000, // Assuming avg price
        bySource: {
          organic: conversions.enrollments * 0.4 * 75000,
          paid: conversions.enrollments * 0.6 * 75000,
        },
      },
      userEngagement: {
        activeUsers: uniqueUsers,
        avgSessionDuration,
        returnRate,
      },
    }
  }

  /**
   * Store event in database (production)
   */
  private async storeInDatabase(event: AnalyticsEvent): Promise<void> {
    try {
      const prisma = (await import('@/lib/prisma')).default
      const { nanoid } = await import('nanoid')

      await prisma.analytics_events.create({
        data: {
          id: nanoid(),
          userId: event.userId || null,
          sessionId: event.sessionId || null,
          eventType: event.type,
          eventName: event.type,
          properties: event.metadata,
          pagePath: event.metadata.page as string | null,
          pageTitle: event.metadata.pageTitle as string | null,
          referrer: event.metadata.referrer as string | null,
          userAgent: event.metadata.userAgent as string | null,
          utmSource: event.metadata.utmSource as string | null,
          utmMedium: event.metadata.utmMedium as string | null,
          utmCampaign: event.metadata.utmCampaign as string | null,
          ipAddress: event.metadata.ipAddress as string | null,
          country: event.metadata.country as string | null,
          city: event.metadata.city as string | null,
        },
      })

      logger.debug('Analytics event stored in database', { eventType: event.type })
    } catch (error) {
      logger.error('Failed to store analytics event', error as Error)
    }
  }

  /**
   * Export analytics data
   */
  exportData(format: 'json' | 'csv' = 'json'): string {
    if (format === 'json') {
      return JSON.stringify(this.events, null, 2)
    }

    // CSV format
    const headers = ['timestamp', 'type', 'userId', 'sessionId', 'metadata']
    const rows = this.events.map((e) => [
      e.timestamp.toISOString(),
      e.type,
      e.userId || '',
      e.sessionId || '',
      JSON.stringify(e.metadata),
    ])

    return [headers, ...rows].map((row) => row.join(',')).join('\n')
  }

  /**
   * Clear old events
   */
  clearOldEvents(daysToKeep: number = 90): void {
    const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000)
    this.events = this.events.filter((e) => e.timestamp >= cutoffDate)
  }
}

// Export singleton instance
export const customAnalytics = new CustomAnalytics()
