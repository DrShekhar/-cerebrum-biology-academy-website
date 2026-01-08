/**
 * SEO Marketing Machine - Content Analytics
 *
 * Track content performance: views, clicks, conversions, time on page.
 * Integrates with existing Supabase database for persistent storage.
 */

import { ContentAnalytics, SEOContentType } from './types'

// ============================================
// TYPES
// ============================================

export interface ContentPerformance {
  contentId: string
  contentType: SEOContentType
  title: string
  slug: string
  metrics: {
    views: number
    uniqueViews: number
    avgTimeOnPage: number // seconds
    bounceRate: number // percentage
    scrollDepth: number // percentage
  }
  conversions: {
    whatsappClicks: number
    leadMagnetDownloads: number
    enrollmentClicks: number
  }
  seo: {
    impressions: number
    clicks: number
    ctr: number // click-through rate
    avgPosition: number
    topKeywords: string[]
  }
  period: {
    start: string
    end: string
  }
}

export interface DailyMetric {
  date: string
  views: number
  uniqueViews: number
  conversions: number
}

export interface ContentRanking {
  contentId: string
  title: string
  score: number
  views: number
  conversions: number
  engagement: number
}

// ============================================
// ANALYTICS TRACKER (Client-Side)
// ============================================

class ContentAnalyticsTracker {
  private sessionId: string
  private pageStartTime: number = 0
  private scrollDepth: number = 0
  private isTracking: boolean = false

  constructor() {
    this.sessionId = this.generateSessionId()
  }

  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  }

  /**
   * Start tracking a page view
   */
  startPageView(contentId: string, contentType: SEOContentType): void {
    if (typeof window === 'undefined') return

    this.pageStartTime = Date.now()
    this.scrollDepth = 0
    this.isTracking = true

    // Track scroll depth
    const handleScroll = () => {
      const scrolled = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentDepth = Math.round((scrolled / docHeight) * 100)
      this.scrollDepth = Math.max(this.scrollDepth, currentDepth)
    }

    window.addEventListener('scroll', handleScroll)

    // Send initial view event
    this.sendEvent('page_view', {
      contentId,
      contentType,
      sessionId: this.sessionId,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
    })

    // Track on unload
    window.addEventListener('beforeunload', () => {
      if (this.isTracking) {
        this.endPageView(contentId)
      }
    })
  }

  /**
   * End tracking and send final metrics
   */
  endPageView(contentId: string): void {
    if (!this.isTracking) return

    const timeOnPage = Math.round((Date.now() - this.pageStartTime) / 1000)
    this.isTracking = false

    this.sendEvent('page_exit', {
      contentId,
      timeOnPage,
      scrollDepth: this.scrollDepth,
      sessionId: this.sessionId,
    })
  }

  /**
   * Track conversion events
   */
  trackConversion(
    contentId: string,
    conversionType: 'whatsapp_click' | 'lead_download' | 'enrollment_click' | 'form_submit'
  ): void {
    this.sendEvent('conversion', {
      contentId,
      conversionType,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
    })
  }

  /**
   * Track CTA click
   */
  trackCTAClick(contentId: string, ctaType: string, ctaText: string): void {
    this.sendEvent('cta_click', {
      contentId,
      ctaType,
      ctaText,
      sessionId: this.sessionId,
    })
  }

  /**
   * Send analytics event to server
   * Uses the existing /api/analytics/track endpoint format
   */
  private async sendEvent(eventType: string, data: Record<string, unknown>): Promise<void> {
    // Format for existing analytics API
    const payload = {
      activities: [
        {
          type: `seo_content_${eventType}`,
          userId: 'anonymous',
          sessionId: this.sessionId,
          metadata: {
            ...data,
            eventType,
            page: typeof window !== 'undefined' ? window.location.pathname : '',
            pageTitle: typeof document !== 'undefined' ? document.title : '',
          },
        },
      ],
      sessionId: this.sessionId,
      timestamp: Date.now(),
    }

    // Use sendBeacon for reliability
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics/track', JSON.stringify(payload))
    } else {
      // Fallback to fetch
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        })
      } catch {
        // Silent fail for analytics
      }
    }
  }
}

// Export singleton instance
export const analyticsTracker = typeof window !== 'undefined' ? new ContentAnalyticsTracker() : null

// ============================================
// SERVER-SIDE ANALYTICS FUNCTIONS
// ============================================

/**
 * Get analytics summary for a content piece
 */
export async function getContentAnalytics(contentId: string): Promise<ContentAnalytics | null> {
  // In production, this would query from database
  // For now, return placeholder structure
  return {
    contentId,
    views: 0,
    clicks: 0,
    conversions: 0,
    avgTimeOnPage: 0,
    bounceRate: 0,
    lastUpdated: new Date().toISOString(),
  }
}

/**
 * Get top performing content
 */
export async function getTopContent(
  limit: number = 10,
  period: '7d' | '30d' | '90d' = '30d'
): Promise<ContentRanking[]> {
  // In production, query and rank by engagement score
  return []
}

/**
 * Get daily metrics for a content piece
 */
export async function getDailyMetrics(
  contentId: string,
  days: number = 30
): Promise<DailyMetric[]> {
  // In production, aggregate from events table
  return []
}

/**
 * Calculate engagement score
 * Higher score = better performance
 */
export function calculateEngagementScore(metrics: {
  views: number
  avgTimeOnPage: number
  bounceRate: number
  conversions: number
}): number {
  // Weighted formula:
  // - Views: 10% (normalized)
  // - Time on Page: 30% (target: 3 min = 100%)
  // - Bounce Rate: 30% (inverse, lower is better)
  // - Conversions: 30% (high impact)

  const viewScore = Math.min(metrics.views / 1000, 1) * 10
  const timeScore = Math.min(metrics.avgTimeOnPage / 180, 1) * 30
  const bounceScore = (1 - metrics.bounceRate / 100) * 30
  const conversionScore = Math.min(metrics.conversions / 10, 1) * 30

  return Math.round(viewScore + timeScore + bounceScore + conversionScore)
}

/**
 * Get content recommendations based on performance
 */
export function getContentRecommendations(performance: ContentPerformance): string[] {
  const recommendations: string[] = []

  if (performance.metrics.avgTimeOnPage < 60) {
    recommendations.push('Content may be too short or not engaging. Consider adding more depth.')
  }

  if (performance.metrics.bounceRate > 70) {
    recommendations.push('High bounce rate. Review meta description accuracy and page load speed.')
  }

  if (performance.metrics.scrollDepth < 50) {
    recommendations.push('Users not reading full content. Add engaging visuals or break up text.')
  }

  if (performance.conversions.whatsappClicks < performance.metrics.views * 0.01) {
    recommendations.push('Low CTA conversion. Test different CTA positions and copy.')
  }

  if (performance.seo.ctr < 2) {
    recommendations.push('Low CTR from search. Improve title and meta description.')
  }

  return recommendations
}

// ============================================
// DASHBOARD DATA HELPERS
// ============================================

export interface AnalyticsDashboardData {
  overview: {
    totalViews: number
    totalConversions: number
    avgEngagement: number
    topContent: ContentRanking[]
  }
  byType: Record<
    SEOContentType,
    {
      count: number
      views: number
      conversions: number
    }
  >
  trends: {
    daily: DailyMetric[]
    weekOverWeek: number // percentage change
  }
}

/**
 * Get aggregated dashboard data
 */
export async function getDashboardData(
  period: '7d' | '30d' | '90d' = '30d'
): Promise<AnalyticsDashboardData> {
  // Placeholder - implement with real database queries
  return {
    overview: {
      totalViews: 0,
      totalConversions: 0,
      avgEngagement: 0,
      topContent: [],
    },
    byType: {
      BLOG_POST: { count: 0, views: 0, conversions: 0 },
      NEWS_ARTICLE: { count: 0, views: 0, conversions: 0 },
      SEO_LANDING_PAGE: { count: 0, views: 0, conversions: 0 },
      SOCIAL_POST: { count: 0, views: 0, conversions: 0 },
      LEAD_MAGNET: { count: 0, views: 0, conversions: 0 },
    },
    trends: {
      daily: [],
      weekOverWeek: 0,
    },
  }
}

// ============================================
// REACT HOOKS (for client components)
// ============================================

/**
 * React hook for tracking page views
 * Usage: useContentAnalytics('blog-123', 'BLOG_POST')
 */
export function useContentAnalytics(contentId: string, contentType: SEOContentType): void {
  if (typeof window === 'undefined') return

  // Start tracking on mount
  if (analyticsTracker) {
    analyticsTracker.startPageView(contentId, contentType)
  }
}

/**
 * Track WhatsApp CTA click
 */
export function trackWhatsAppClick(contentId: string): void {
  if (analyticsTracker) {
    analyticsTracker.trackConversion(contentId, 'whatsapp_click')
  }
}

/**
 * Track lead magnet download
 */
export function trackLeadDownload(contentId: string): void {
  if (analyticsTracker) {
    analyticsTracker.trackConversion(contentId, 'lead_download')
  }
}
