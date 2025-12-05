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

function getConnectionSpeed(): string {
  if (typeof navigator === 'undefined') return ''
  const nav = navigator as Navigator & {
    connection?: {
      effectiveType?: string
    }
  }
  return nav.connection?.effectiveType || ''
}

function sendToAnalytics(metric: Metric, options: { path: string; analyticsId?: string }) {
  const body: Record<string, string> = {
    dsn: options.analyticsId || process.env.NEXT_PUBLIC_ANALYTICS_ID || '',
    id: metric.id,
    page: options.path,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  }

  if (options.analyticsId) {
    const blob = new Blob([new URLSearchParams(body).toString()], {
      type: 'application/x-www-form-urlencoded',
    })
    if (navigator.sendBeacon) {
      navigator.sendBeacon(vitalsUrl, blob)
    }
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

  const handleMetric = (metric: Metric) => {
    sendToConsole(metric)

    sendToGoogleAnalytics(metric)

    sendToAnalytics(metric, { path })

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
