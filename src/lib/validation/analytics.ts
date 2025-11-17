import { z } from 'zod'
import {
  paginationSchema,
  dateRangeSchema,
  metadataSchema,
  idSchema,
  eventTypeSchema,
} from './common'

/**
 * Analytics API Validation Schemas
 */

// ============================================
// Event Tracking
// ============================================

export const trackEventSchema = z.object({
  eventType: z.enum([
    'page_view',
    'button_click',
    'form_submit',
    'video_play',
    'video_complete',
    'purchase_initiated',
    'purchase_completed',
    'signup',
    'login',
    'demo_booked',
    'course_viewed',
    'test_started',
    'test_completed',
  ]),
  eventData: metadataSchema.optional(),
  userId: idSchema.optional(),
  sessionId: idSchema.optional(),
  page: z.string().optional(),
  referrer: z.string().optional(),
  timestamp: z.string().datetime().optional(),
})

// ============================================
// Dashboard Analytics
// ============================================

export const analyticsQuerySchema = z
  .object({
    userId: idSchema.optional(),
    metric: z
      .enum(['users', 'sessions', 'pageviews', 'conversions', 'revenue', 'engagement', 'retention'])
      .optional(),
    groupBy: z.enum(['hour', 'day', 'week', 'month']).optional().default('day'),
  })
  .merge(dateRangeSchema)
  .merge(paginationSchema)

// ============================================
// Funnel Analytics
// ============================================

export const funnelAnalyticsSchema = z.object({
  funnelId: idSchema.optional(),
  steps: z
    .array(
      z.object({
        name: z.string(),
        eventType: eventTypeSchema,
      })
    )
    .min(2, 'Funnel must have at least 2 steps')
    .max(10, 'Funnel cannot have more than 10 steps')
    .optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
})

// ============================================
// Heatmap Data
// ============================================

export const heatmapQuerySchema = z.object({
  page: z.string().url('Must be a valid URL'),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  deviceType: z.enum(['desktop', 'mobile', 'tablet']).optional(),
})

// ============================================
// A/B Testing
// ============================================

export const abTestSchema = z.object({
  testId: idSchema,
  variant: z.enum(['A', 'B', 'control']),
  userId: idSchema.optional(),
  converted: z.boolean().optional(),
  metadata: metadataSchema.optional(),
})

// ============================================
// Real-time Analytics
// ============================================

export const realTimeQuerySchema = z.object({
  metric: z.enum(['active_users', 'page_views', 'events']),
  interval: z.enum(['1m', '5m', '15m', '1h']).default('5m'),
})

// ============================================
// Export Analytics
// ============================================

export const exportAnalyticsSchema = z
  .object({
    format: z.enum(['csv', 'json', 'excel']).default('csv'),
    metrics: z.array(z.string()).min(1, 'At least one metric required'),
    includeHeaders: z.boolean().default(true),
  })
  .merge(dateRangeSchema)

// ============================================
// Performance Analytics
// ============================================

export const performanceMetricsSchema = z.object({
  page: z.string().url().optional(),
  metric: z.enum(['FCP', 'LCP', 'FID', 'CLS', 'TTFB', 'load_time']).optional(),
  percentile: z.enum(['50', '75', '90', '95', '99']).default('75'),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
})

// ============================================
// Comparative Analytics
// ============================================

export const comparativeAnalyticsSchema = z.object({
  metric: z.string(),
  periods: z
    .array(
      z.object({
        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
        label: z.string().optional(),
      })
    )
    .min(2, 'Need at least 2 periods to compare')
    .max(4, 'Maximum 4 periods for comparison'),
  groupBy: z.enum(['day', 'week', 'month']).default('day'),
})
