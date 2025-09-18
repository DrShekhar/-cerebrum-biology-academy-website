'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { ABTestingService, ABTestAssignment } from '@/lib/abTesting/abTestingService'

interface ABTestContextType {
  getVariant: (testId: string) => string | null
  getConfig: (testId: string) => Record<string, any> | null
  trackConversion: (
    testId: string,
    eventType?: 'signup' | 'payment' | 'demo_booking',
    value?: number
  ) => void
  trackClick: (testId: string, element?: string) => void
  isLoading: boolean
}

const ABTestContext = createContext<ABTestContextType | undefined>(undefined)

export function ABTestProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [assignments, setAssignments] = useState<Record<string, ABTestAssignment>>({})

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Initialize A/B test assignments for all active tests
    const activeTests = ABTestingService.getAllActiveTests()
    const newAssignments: Record<string, ABTestAssignment> = {}

    activeTests.forEach((test) => {
      const assignment = ABTestingService.assignUserToTest(test.id)
      if (assignment) {
        newAssignments[test.id] = assignment
      }
    })

    setAssignments(newAssignments)
    setIsLoading(false)
  }, [])

  const getVariant = (testId: string): string | null => {
    return assignments[testId]?.variantId || null
  }

  const getConfig = (testId: string): Record<string, any> | null => {
    return ABTestingService.getVariantConfig(testId)
  }

  const trackConversion = (
    testId: string,
    eventType: 'signup' | 'payment' | 'demo_booking' = 'signup',
    value?: number
  ) => {
    ABTestingService.trackConversion(testId, eventType, value)
  }

  const trackClick = (testId: string, element?: string) => {
    const assignment = assignments[testId]
    if (!assignment) return

    ABTestingService.trackEvent({
      userId: assignment.userId,
      testId,
      variantId: assignment.variantId,
      eventType: 'click',
      timestamp: new Date().toISOString(),
      metadata: { element },
    })
  }

  return (
    <ABTestContext.Provider
      value={{
        getVariant,
        getConfig,
        trackConversion,
        trackClick,
        isLoading,
      }}
    >
      {children}
    </ABTestContext.Provider>
  )
}

export function useABTest() {
  const context = useContext(ABTestContext)
  if (context === undefined) {
    throw new Error('useABTest must be used within an ABTestProvider')
  }
  return context
}

// Hook for specific test
export function useABTestVariant(testId: string) {
  const { getVariant, getConfig, trackClick, trackConversion } = useABTest()

  const variant = getVariant(testId)
  const config = getConfig(testId)

  return {
    variant,
    config,
    trackClick: (element?: string) => trackClick(testId, element),
    trackConversion: (eventType?: 'signup' | 'payment' | 'demo_booking', value?: number) =>
      trackConversion(testId, eventType, value),
  }
}
