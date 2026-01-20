/**
 * ARIA Sales Agent - Proactive Engagement Hook
 * Triggers ARIA widget to auto-open based on user behavior
 */

'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { Language } from '@/lib/aria/types'
import { getTranslation } from '@/lib/aria/translations'

const STORAGE_KEY = 'aria_engagement'

interface EngagementConfig {
  exitIntentDelay: number      // ms before exit intent is active
  timeOnPageDelay: number      // ms before time-based trigger
  scrollDepthThreshold: number // percentage (0-1)
  pricingPageDelay: number     // ms delay on pricing pages
  returningVisitorDelay: number // ms delay for return visitors
}

interface StoredEngagement {
  hasSeenProactive: boolean
  doNotShow: boolean
  lastProactiveTime: number
  sessionCount: number
}

type TriggerType = 'exit_intent' | 'time_on_page' | 'scroll_depth' | 'pricing_page' | 'returning_visitor'

interface ProactiveTrigger {
  type: TriggerType
  message: string
}

const DEFAULT_CONFIG: EngagementConfig = {
  exitIntentDelay: 30000,      // 30s before exit intent
  timeOnPageDelay: 45000,      // 45s idle time
  scrollDepthThreshold: 0.6,   // 60% scroll
  pricingPageDelay: 5000,      // 5s on pricing page
  returningVisitorDelay: 5000, // 5s for returning visitors
}

// Pricing-related path patterns
const PRICING_PATHS = ['/pricing', '/courses', '/fees', '/admission']

function isPricingPage(pathname: string): boolean {
  return PRICING_PATHS.some((path) => pathname.includes(path))
}

export function useProactiveEngagement(
  language: Language = 'en',
  config: Partial<EngagementConfig> = {}
) {
  const fullConfig = { ...DEFAULT_CONFIG, ...config }

  const [shouldShowProactive, setShouldShowProactive] = useState(false)
  const [proactiveTrigger, setProactiveTrigger] = useState<ProactiveTrigger | null>(null)
  const [hasTriggered, setHasTriggered] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hasScrolledRef = useRef(false)
  const isInitializedRef = useRef(false)

  // Load stored engagement state
  const getStoredState = useCallback((): StoredEngagement => {
    if (typeof window === 'undefined') {
      return {
        hasSeenProactive: false,
        doNotShow: false,
        lastProactiveTime: 0,
        sessionCount: 0,
      }
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch {
      // Invalid JSON
    }

    return {
      hasSeenProactive: false,
      doNotShow: false,
      lastProactiveTime: 0,
      sessionCount: 0,
    }
  }, [])

  // Update stored engagement state
  const updateStoredState = useCallback((updates: Partial<StoredEngagement>) => {
    if (typeof window === 'undefined') return

    try {
      const current = getStoredState()
      const newState = { ...current, ...updates }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
    } catch {
      // localStorage unavailable
    }
  }, [getStoredState])

  // Trigger proactive engagement
  const triggerProactive = useCallback(
    (type: TriggerType) => {
      if (hasTriggered) return

      // Get appropriate message based on trigger type
      let messageKey: string
      switch (type) {
        case 'exit_intent':
          messageKey = 'proactiveExit'
          break
        case 'time_on_page':
          messageKey = 'proactiveTime'
          break
        case 'scroll_depth':
          messageKey = 'proactiveScroll'
          break
        case 'pricing_page':
          messageKey = 'proactivePricing'
          break
        case 'returning_visitor':
          messageKey = 'proactiveReturn'
          break
        default:
          messageKey = 'proactiveTime'
      }

      const message = getTranslation(messageKey, language)

      setProactiveTrigger({ type, message })
      setShouldShowProactive(true)
      setHasTriggered(true)

      updateStoredState({
        hasSeenProactive: true,
        lastProactiveTime: Date.now(),
      })
    },
    [hasTriggered, language, updateStoredState]
  )

  // Dismiss proactive and optionally set "don't show again"
  const dismissProactive = useCallback(
    (doNotShowAgain = false) => {
      setShouldShowProactive(false)
      setProactiveTrigger(null)

      if (doNotShowAgain) {
        updateStoredState({ doNotShow: true })
      }
    },
    [updateStoredState]
  )

  // Accept proactive (user clicked to open widget)
  const acceptProactive = useCallback(() => {
    setShouldShowProactive(false)
    // Keep trigger info for analytics, will be cleared when widget opens
    return proactiveTrigger
  }, [proactiveTrigger])

  // Clear trigger after it's been used
  const clearTrigger = useCallback(() => {
    setProactiveTrigger(null)
  }, [])

  // Reset for testing
  const resetEngagement = useCallback(() => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEY)
    setHasTriggered(false)
    setShouldShowProactive(false)
    setProactiveTrigger(null)
  }, [])

  // Check if should trigger proactive based on stored state
  const shouldTrigger = useCallback((): boolean => {
    const stored = getStoredState()

    // Never show if user opted out
    if (stored.doNotShow) return false

    // Don't show if shown in last hour
    const oneHourAgo = Date.now() - 60 * 60 * 1000
    if (stored.lastProactiveTime > oneHourAgo) return false

    // Already triggered this session
    if (hasTriggered) return false

    return true
  }, [getStoredState, hasTriggered])

  // Setup proactive triggers
  useEffect(() => {
    if (typeof window === 'undefined' || isInitializedRef.current) return
    isInitializedRef.current = true

    // Increment session count
    const stored = getStoredState()
    updateStoredState({ sessionCount: stored.sessionCount + 1 })

    if (!shouldTrigger()) return

    const pathname = window.location.pathname
    const isReturningVisitor = stored.sessionCount > 0

    // Priority 1: Returning visitor (quick trigger)
    if (isReturningVisitor) {
      timeoutRef.current = setTimeout(() => {
        if (shouldTrigger()) {
          triggerProactive('returning_visitor')
        }
      }, fullConfig.returningVisitorDelay)
      return
    }

    // Priority 2: Pricing page
    if (isPricingPage(pathname)) {
      timeoutRef.current = setTimeout(() => {
        if (shouldTrigger()) {
          triggerProactive('pricing_page')
        }
      }, fullConfig.pricingPageDelay)
      return
    }

    // Priority 3: Time on page
    timeoutRef.current = setTimeout(() => {
      if (shouldTrigger()) {
        triggerProactive('time_on_page')
      }
    }, fullConfig.timeOnPageDelay)

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [
    fullConfig,
    getStoredState,
    shouldTrigger,
    triggerProactive,
    updateStoredState,
  ])

  // Exit intent detection (desktop only)
  useEffect(() => {
    if (typeof window === 'undefined' || hasTriggered) return

    let exitIntentEnabled = false

    // Enable exit intent after delay
    const enableTimeout = setTimeout(() => {
      exitIntentEnabled = true
    }, fullConfig.exitIntentDelay)

    const handleMouseLeave = (e: MouseEvent) => {
      if (!exitIntentEnabled || hasTriggered) return

      // Check if mouse is leaving through top of viewport
      if (e.clientY <= 0 && shouldTrigger()) {
        triggerProactive('exit_intent')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearTimeout(enableTimeout)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [fullConfig.exitIntentDelay, hasTriggered, shouldTrigger, triggerProactive])

  // Scroll depth tracking
  useEffect(() => {
    if (typeof window === 'undefined' || hasTriggered || hasScrolledRef.current) return

    const handleScroll = () => {
      if (hasScrolledRef.current || hasTriggered) return

      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0

      if (scrollPercent >= fullConfig.scrollDepthThreshold && shouldTrigger()) {
        hasScrolledRef.current = true
        triggerProactive('scroll_depth')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [fullConfig.scrollDepthThreshold, hasTriggered, shouldTrigger, triggerProactive])

  return {
    // State
    shouldShowProactive,
    proactiveTrigger,
    hasTriggered,

    // Actions
    dismissProactive,
    acceptProactive,
    clearTrigger,
    resetEngagement,

    // Utilities
    getStoredState,
  }
}

export type UseProactiveEngagementReturn = ReturnType<typeof useProactiveEngagement>
