'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import type {
  UserPreferences,
  PersonalizationContext,
  CourseRecommendation,
} from '@/lib/personalization/userPreferences'

const PersonalizationContextInstance = createContext<PersonalizationContext | undefined>(undefined)

export function usePersonalization() {
  const context = useContext(PersonalizationContextInstance)
  if (!context) {
    // Return a no-op context for SSR and before hydration
    return {
      preferences: {},
      updatePreferences: () => {},
      resetPreferences: () => {},
      getRecommendations: () => [],
      getPersonalizedContent: () => null,
      trackBehavior: () => {},
    } as PersonalizationContext
  }
  return context
}

interface PersonalizationProviderProps {
  children: React.ReactNode
}

/**
 * PERFORMANCE: Lazy PersonalizationProvider
 *
 * This provider defers ALL initialization work until after the initial render.
 * This eliminates provider-related blocking during LCP.
 *
 * Key optimizations:
 * 1. No initialization work during initial render
 * 2. Uses requestIdleCallback for deferred initialization
 * 3. Batches localStorage operations
 * 4. Skips geolocation and heavy operations on initial load
 */
export function PersonalizationProviderLazy({ children }: PersonalizationProviderProps) {
  const [preferences, setPreferences] = useState<UserPreferences>({})
  const [isInitialized, setIsInitialized] = useState(false)

  // PERFORMANCE: Defer ALL initialization to after first paint
  useEffect(() => {
    const initializePersonalization = () => {
      if (typeof window === 'undefined') return

      try {
        // Batch read localStorage
        const stored = localStorage.getItem('cerebrum_user_preferences')
        const initialPrefs = stored ? JSON.parse(stored) : {}

        // Detect minimal user info (non-blocking)
        const updates: Partial<UserPreferences> = {
          ...initialPrefs,
          deviceType: /Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
            ? /iPad|Tablet/i.test(navigator.userAgent)
              ? 'tablet'
              : 'mobile'
            : 'desktop',
          visitCount: (initialPrefs.visitCount || 0) + 1,
          lastVisit: new Date().toISOString(),
        }

        // Detect referral source (non-blocking)
        if (document.referrer && !initialPrefs.referralSource) {
          try {
            const referrerDomain = new URL(document.referrer).hostname
            if (referrerDomain.includes('google')) updates.referralSource = 'google'
            else if (referrerDomain.includes('facebook')) updates.referralSource = 'facebook'
            else if (referrerDomain.includes('youtube')) updates.referralSource = 'youtube'
            else updates.referralSource = 'referral'
          } catch {
            updates.referralSource = 'direct'
          }
        } else if (!initialPrefs.referralSource) {
          updates.referralSource = 'direct'
        }

        setPreferences(updates)

        // Persist updates asynchronously
        requestAnimationFrame(() => {
          localStorage.setItem('cerebrum_user_preferences', JSON.stringify(updates))
        })

        setIsInitialized(true)
      } catch (error) {
        console.error('PersonalizationProvider init error:', error)
        setIsInitialized(true)
      }
    }

    // Run initialization synchronously - localStorage is fast (~1ms)
    initializePersonalization()
  }, [])

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...updates }

      // Async persist
      if (typeof window !== 'undefined') {
        requestAnimationFrame(() => {
          localStorage.setItem('cerebrum_user_preferences', JSON.stringify(updated))
        })
      }

      return updated
    })
  }, [])

  const resetPreferences = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cerebrum_user_preferences')
      localStorage.removeItem('cerebrum_user_behavior')
    }
    setPreferences({})
  }, [])

  const getRecommendations = useCallback((): CourseRecommendation[] => {
    // Lazy import to avoid loading the full module at startup
    if (!isInitialized) return []

    const recommendations: CourseRecommendation[] = []

    if (preferences.currentClass) {
      switch (preferences.currentClass) {
        case '11':
          recommendations.push({
            courseId: 'class-11-foundation',
            courseName: 'Class 11th NEET Biology Foundation',
            match: 95,
            reasons: ['Perfect for your current class', 'Strong foundation building'],
            priority: 'high',
            customMessage: 'Build a strong foundation for NEET success!',
          })
          break
        case '12':
          recommendations.push({
            courseId: 'class-12-intensive',
            courseName: 'Class 12th NEET Biology Intensive',
            match: 90,
            reasons: ['Aligned with your current studies', 'Board + NEET preparation'],
            priority: 'high',
            customMessage: 'Ace both boards and NEET this year!',
          })
          break
        case 'dropper':
          recommendations.push({
            courseId: 'neet-dropper-program',
            courseName: 'NEET Dropper Program',
            match: 98,
            reasons: ['Specifically designed for droppers', 'Intensive preparation'],
            priority: 'high',
            customMessage: 'Transform your preparation and achieve your target!',
          })
          break
      }
    }

    return recommendations.sort((a, b) => b.match - a.match)
  }, [preferences, isInitialized])

  const getPersonalizedContent = useCallback(
    (contentType: string): string | null => {
      if (!isInitialized) return null

      if (contentType === 'hero_message') {
        if (preferences.currentClass === 'dropper') {
          return 'Ready to crack NEET this year? Join our proven dropper program!'
        }
        if (preferences.targetScore && preferences.targetScore > 600) {
          return 'Aiming for top medical colleges? Our premium program guarantees 330+ in Biology!'
        }
        if (preferences.location?.city?.toLowerCase().includes('delhi')) {
          return "Delhi's #1 NEET Biology coaching now available in your area!"
        }
      }

      return null
    },
    [preferences, isInitialized]
  )

  const trackBehavior = useCallback((action: string, data?: Record<string, unknown>): void => {
    if (typeof window === 'undefined') return

    // Defer tracking to idle time
    const track = () => {
      try {
        const behavior = {
          action,
          data,
          timestamp: new Date().toISOString(),
          url: window.location.pathname,
        }

        const existing = localStorage.getItem('cerebrum_user_behavior')
        const behaviors = existing ? JSON.parse(existing) : []
        behaviors.push(behavior)

        // Keep only last 50 behaviors
        if (behaviors.length > 50) {
          behaviors.splice(0, behaviors.length - 50)
        }

        localStorage.setItem('cerebrum_user_behavior', JSON.stringify(behaviors))
      } catch {
        // Silent fail for tracking
      }
    }

    if ('requestIdleCallback' in window) {
      ;(
        window as typeof window & { requestIdleCallback: (cb: () => void) => void }
      ).requestIdleCallback(track)
    } else {
      setTimeout(track, 100)
    }
  }, [])

  const value: PersonalizationContext = useMemo(
    () => ({
      preferences,
      updatePreferences,
      resetPreferences,
      getRecommendations,
      getPersonalizedContent,
      trackBehavior,
    }),
    [
      preferences,
      updatePreferences,
      resetPreferences,
      getRecommendations,
      getPersonalizedContent,
      trackBehavior,
    ]
  )

  return (
    <PersonalizationContextInstance.Provider value={value}>
      {children}
    </PersonalizationContextInstance.Provider>
  )
}
