'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { FunnelTracker, COURSE_SELECTION_FUNNEL } from '../lib/analytics/conversionFunnelAnalysis'

export function useFunnelAnalytics(userId: string) {
  const [tracker] = useState(() => new FunnelTracker(userId))
  const [currentStep, setCurrentStep] = useState<string | null>(null)
  const stepTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map())

  const trackStepEntry = useCallback(
    (stepId: string, metadata?: Record<string, any>) => {
      // Clear previous step if exists
      if (currentStep && currentStep !== stepId) {
        tracker.trackStepExit(currentStep, 'navigation')
      }

      tracker.trackStepEntry(stepId, metadata)
      setCurrentStep(stepId)

      // Set timeout for step if expected time is defined
      const step = COURSE_SELECTION_FUNNEL.find((s) => s.id === stepId)
      if (step?.expectedTime) {
        const timeout = setTimeout(
          () => {
            tracker.trackStepExit(stepId, 'timeout')
          },
          step.expectedTime * 2 * 1000
        ) // 2x expected time as timeout

        stepTimeouts.current.set(stepId, timeout)
      }
    },
    [tracker, currentStep]
  )

  const trackStepCompletion = useCallback(
    (stepId: string, metadata?: Record<string, any>) => {
      tracker.trackStepCompletion(stepId, metadata)
      setCurrentStep(null)

      // Clear timeout
      const timeout = stepTimeouts.current.get(stepId)
      if (timeout) {
        clearTimeout(timeout)
        stepTimeouts.current.delete(stepId)
      }
    },
    [tracker]
  )

  const trackStepExit = useCallback(
    (
      stepId: string,
      exitReason?: 'timeout' | 'error' | 'abandonment' | 'navigation',
      metadata?: Record<string, any>
    ) => {
      tracker.trackStepExit(stepId, exitReason, metadata)
      setCurrentStep(null)

      // Clear timeout
      const timeout = stepTimeouts.current.get(stepId)
      if (timeout) {
        clearTimeout(timeout)
        stepTimeouts.current.delete(stepId)
      }
    },
    [tracker]
  )

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      stepTimeouts.current.forEach((timeout) => clearTimeout(timeout))
    }
  }, [])

  return {
    trackStepEntry,
    trackStepCompletion,
    trackStepExit,
    currentStep,
    getSessionEvents: tracker.getSessionEvents.bind(tracker),
  }
}
