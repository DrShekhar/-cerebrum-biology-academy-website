'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useAuth } from '@/contexts/AuthContext'
import { AriaErrorBoundary, AriaLoadingFallback } from '@/components/sales-agent/AriaErrorBoundary'

// Note: Removed ssr: false to prevent BAILOUT_TO_CLIENT_SIDE_RENDERING error in Next.js 15
// Components handle browser-only APIs internally with mounted state checks
const FloatingCTAComponent = dynamic(
  () => import('@/components/common/FloatingCTA').then((mod) => mod.FloatingCTA),
  { loading: () => null }
)

const GlobalExitIntentComponent = dynamic(
  () => import('@/components/conversion/GlobalExitIntent').then((mod) => mod.GlobalExitIntent),
  { loading: () => null }
)

export const ChatbotWrapper = dynamic(
  () => import('@/components/chat/ChatbotWrapper').then((mod) => mod.ChatbotWrapper),
  { loading: () => null }
)

// ARIA Sales Agent - Lazy loaded for performance with loading fallback
const SalesAgentWidgetComponent = dynamic(
  () => import('@/components/sales-agent').then((mod) => mod.SalesAgentWidget),
  {
    loading: () => null, // Initial null - loading state handled by parent
  }
)

export function FloatingCTA() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // PERFORMANCE: Increased delay from 4s to 6s for better mobile LCP
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(() => setShouldLoad(true), { timeout: 6000 })
      return () => cancelIdleCallback(idleId)
    } else {
      const timerId = setTimeout(() => setShouldLoad(true), 5000)
      return () => clearTimeout(timerId)
    }
  }, [])

  if (!shouldLoad) return null
  return <FloatingCTAComponent />
}

export function GlobalExitIntent() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // PERFORMANCE: Increased delay from 6s to 10s - exit intent is very low priority
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(() => setShouldLoad(true), { timeout: 10000 })
      return () => cancelIdleCallback(idleId)
    } else {
      const timerId = setTimeout(() => setShouldLoad(true), 8000)
      return () => clearTimeout(timerId)
    }
  }, [])

  if (!shouldLoad) return null
  return <GlobalExitIntentComponent />
}

// ARIA Sales Agent - Delays load for 3 seconds for better LCP
// Wrapped with AriaErrorBoundary to catch component crashes
// CONDITIONAL DISPLAY: Only shown on public pages (non-authenticated users)
export function SalesAgentWidget() {
  const { user, isLoading: authLoading } = useAuth()
  const [shouldLoad, setShouldLoad] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // PERFORMANCE: Delay sales agent even more to prioritize LCP and core interactivity
    // Changed from 5s to 8s timeout for better mobile performance
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(() => setShouldLoad(true), { timeout: 8000 })
      return () => cancelIdleCallback(idleId)
    } else {
      const timerId = setTimeout(() => setShouldLoad(true), 6000)
      return () => clearTimeout(timerId)
    }
  }, [])

  const handleClose = useCallback(() => {
    setIsVisible(false)
  }, [])

  const handleRetry = useCallback(() => {
    setLoadError(false)
    setShouldLoad(true)
  }, [])

  const handleError = useCallback(() => {
    console.error('[ARIA] Component error caught by boundary')
  }, [])

  // Don't render while checking authentication
  if (authLoading) return null

  // Hide Aria if user is authenticated (show only on public pages)
  if (user) return null

  if (!isVisible) return null
  if (!shouldLoad) return null

  // Show loading fallback if there was a load error (e.g., network issue)
  if (loadError) {
    return <AriaLoadingFallback onRetry={handleRetry} onClose={handleClose} />
  }

  return (
    <AriaErrorBoundary onClose={handleClose} onError={handleError}>
      <SalesAgentWidgetComponent />
    </AriaErrorBoundary>
  )
}

// PERFORMANCE: Lazy-load mobile bottom navigation (only needed on mobile, defers lucide-react icons)
// Note: Removed ssr: false - component handles mounted state internally for auth-dependent UI
export const DynamicMobileNavigation = dynamic(
  () => import('@/components/navigation/MobileBottomNav').then((mod) => mod.MobileNavigation),
  { loading: () => null }
)

// PERFORMANCE: Lazy-load PWA provider (service worker registration can wait)
// Temporarily disabled due to webpack module resolution issue
export const DynamicPWAProvider = () => null

// PERFORMANCE: Lazy-load trial banner with SSR for reduced FOUC
export const DynamicTrialBanner = dynamic(
  () => import('@/components/trial/TrialBannerWrapper').then((mod) => mod.TrialBannerWrapper),
  { ssr: true }
)

// Maintenance popup - SSR enabled for reduced FOUC
export const DynamicMaintenancePopup = dynamic(
  () => import('@/components/ui/MaintenancePopup').then((mod) => mod.MaintenancePopup),
  { ssr: true }
)

// Lazy-load Footer to defer framer-motion bundle (Footer uses motion components)
// This reduces initial JS by ~50KB since footer is below the fold
export const DynamicFooter = dynamic(
  () => import('@/components/layout/Footer').then((mod) => mod.Footer),
  {
    ssr: true, // Keep server rendering for SEO (footer has many links)
    loading: () => (
      <footer className="bg-gray-900 text-white min-h-[200px]" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-800 rounded w-52"></div>
          </div>
        </div>
      </footer>
    ),
  }
)
