'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { reportWebVitals, type WebVitalsMetric } from '@/lib/webVitals'

interface WebVitalsReporterProps {
  onMetric?: (metric: WebVitalsMetric) => void
}

export function WebVitalsReporter({ onMetric }: WebVitalsReporterProps) {
  const pathname = usePathname()

  useEffect(() => {
    reportWebVitals((metric) => {
      if (onMetric) {
        onMetric(metric)
      }
    })
  }, [pathname, onMetric])

  return null
}

export default WebVitalsReporter
