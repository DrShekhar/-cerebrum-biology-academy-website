import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals'

type WebVitalsMetric = {
  id: string
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  navigationType: string
}

type ReportHandler = (metric: WebVitalsMetric) => void

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals'

const metricsQueue: Metric[] = []
let flushScheduled = false
let isLCPReported = false

function getConnectionSpeed(): string {
  if (typeof navigator === 'undefined') return ''
  const nav = navigator as Navigator & {
    connection?: {
      effectiveType?: string
    }
  }
  return nav.connection?.effectiveType || ''
}

function flushMetrics(path: string, analyticsId?: string) {
  if (metricsQueue.length === 0) return

  const metrics = [...metricsQueue]
  metricsQueue.length = 0

  const batchBody = metrics.map((metric) => ({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    page: path,
    id: metric.id,
    delta: metric.delta,
    connection: getConnectionSpeed(),
  }))

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/vitals', JSON.stringify(batchBody))
  } else {
    fetch('/api/vitals', {
      method: 'POST',
      body: JSON.stringify(batchBody),
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    }).catch(() => {})
  }

  if (analyticsId) {
    metrics.forEach((metric) => {
      const body: Record<string, string> = {
        dsn: analyticsId,
        id: metric.id,
        page: path,
        href: window.location.href,
        event_name: metric.name,
        value: metric.value.toString(),
        speed: getConnectionSpeed(),
      }
      const blob = new Blob([new URLSearchParams(body).toString()], {
        type: 'application/x-www-form-urlencoded',
      })
      navigator.sendBeacon?.(vitalsUrl, blob)
    })
  }

  metrics.forEach((metric) => sendToGoogleAnalytics(metric))
}

function scheduleFlush(path: string, analyticsId?: string) {
  if (flushScheduled) return

  flushScheduled = true

  if ('requestIdleCallback' in window) {
    requestIdleCallback(
      () => {
        flushMetrics(path, analyticsId)
        flushScheduled = false
      },
      { timeout: 3000 }
    )
  } else {
    setTimeout(() => {
      flushMetrics(path, analyticsId)
      flushScheduled = false
    }, 2000)
  }
}

function sendToGoogleAnalytics(metric: Metric) {
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
  if (typeof gtag !== 'function') return

  gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    non_interaction: true,
    metric_id: metric.id,
    metric_value: metric.value,
    metric_delta: metric.delta,
    metric_rating: metric.rating,
  })
}

function sendToConsole(metric: Metric) {
  if (process.env.NODE_ENV === 'development') {
    const color =
      metric.rating === 'good' ? 'green' : metric.rating === 'needs-improvement' ? 'orange' : 'red'
    console.log(
      `%c[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`,
      `color: ${color}; font-weight: bold;`
    )
  }
}

export function reportWebVitals(onReport?: ReportHandler) {
  const path = typeof window !== 'undefined' ? window.location.pathname : ''
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID

  const handleMetric = (metric: Metric) => {
    sendToConsole(metric)

    metricsQueue.push(metric)

    if (metric.name === 'LCP') {
      isLCPReported = true
      scheduleFlush(path, analyticsId)
    } else if (isLCPReported) {
      scheduleFlush(path, analyticsId)
    }

    if (onReport) {
      onReport({
        id: metric.id,
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        navigationType: metric.navigationType || 'navigate',
      })
    }
  }

  const initWebVitals = () => {
    try {
      onCLS(handleMetric)
      onFCP(handleMetric)
      onINP(handleMetric)
      onLCP(handleMetric)
      onTTFB(handleMetric)
    } catch (error) {
      console.error('Error initializing web-vitals:', error)
    }
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(initWebVitals, { timeout: 5000 })
  } else {
    setTimeout(initWebVitals, 1000)
  }
}

export function getWebVitalsThresholds() {
  return {
    LCP: { good: 2500, poor: 4000 },
    FCP: { good: 1800, poor: 3000 },
    CLS: { good: 0.1, poor: 0.25 },
    INP: { good: 200, poor: 500 },
    TTFB: { good: 800, poor: 1800 },
  }
}

export type { WebVitalsMetric }
