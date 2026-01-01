'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const FloatingCTAComponent = dynamic(
  () => import('@/components/common/FloatingCTA').then((mod) => mod.FloatingCTA),
  { ssr: false }
)

const GlobalExitIntentComponent = dynamic(
  () => import('@/components/conversion/GlobalExitIntent').then((mod) => mod.GlobalExitIntent),
  { ssr: false }
)

export const ChatbotWrapper = dynamic(
  () => import('@/components/chat/ChatbotWrapper').then((mod) => mod.ChatbotWrapper),
  { ssr: false }
)

export function FloatingCTA() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const timerId = setTimeout(() => setShouldLoad(true), 2000)
    return () => clearTimeout(timerId)
  }, [])

  if (!shouldLoad) return null
  return <FloatingCTAComponent />
}

export function GlobalExitIntent() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(() => setShouldLoad(true), { timeout: 6000 })
      return () => cancelIdleCallback(idleId)
    } else {
      const timerId = setTimeout(() => setShouldLoad(true), 4000)
      return () => clearTimeout(timerId)
    }
  }, [])

  if (!shouldLoad) return null
  return <GlobalExitIntentComponent />
}

// PERFORMANCE: Lazy-load mobile navigation (only needed on mobile, defers lucide-react icons)
export const DynamicMobileNavigation = dynamic(
  () => import('@/components/navigation/MobileNavigation').then((mod) => mod.MobileNavigation),
  { ssr: false }
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
