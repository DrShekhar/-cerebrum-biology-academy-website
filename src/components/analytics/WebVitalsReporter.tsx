'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { reportWebVitals, type WebVitalsMetric } from '@/lib/webVitals'

interface WebVitalsReporterProps {
  onMetric?: (metric: WebVitalsMetric) => void
}

export function WebVitalsReporter({ onMetric }: WebVitalsReporterProps) {
  const pathname = usePathname()
  const [shouldReport, setShouldReport] = useState(false)

  // PERFORMANCE: Defer web vitals reporting to avoid blocking LCP/TBT
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(() => setShouldReport(true), { timeout: 5000 })
      return () => cancelIdleCallback(idleId)
    } else {
      const timerId = setTimeout(() => setShouldReport(true), 3000)
      return () => clearTimeout(timerId)
    }
  }, [])

  useEffect(() => {
    if (!shouldReport) return

    reportWebVitals((metric) => {
      if (onMetric) {
        onMetric(metric)
      }
    })
  }, [pathname, onMetric, shouldReport])

  return null
}

export default WebVitalsReporter
