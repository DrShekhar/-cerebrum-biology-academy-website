'use client'

import dynamic from 'next/dynamic'

// Dynamically import non-critical components to reduce initial bundle
export const FloatingCTA = dynamic(
  () => import('@/components/common/FloatingCTA').then((mod) => mod.FloatingCTA),
  { ssr: false }
)

export const GlobalExitIntent = dynamic(
  () => import('@/components/conversion/GlobalExitIntent').then((mod) => mod.GlobalExitIntent),
  { ssr: false }
)

export const ChatbotWrapper = dynamic(
  () => import('@/components/chat/ChatbotWrapper').then((mod) => mod.ChatbotWrapper),
  { ssr: false }
)

// PERFORMANCE: Lazy-load mobile navigation (only needed on mobile, defers lucide-react icons)
export const DynamicMobileNavigation = dynamic(
  () => import('@/components/navigation/MobileNavigation').then((mod) => mod.MobileNavigation),
  { ssr: false }
)

// PERFORMANCE: Lazy-load PWA provider (service worker registration can wait)
export const DynamicPWAProvider = dynamic(
  () => import('@/components/pwa/PWAProvider').then((mod) => mod.PWAProvider),
  { ssr: false }
)

// PERFORMANCE: Lazy-load trial banner (not critical for initial render)
export const DynamicTrialBanner = dynamic(
  () => import('@/components/trial/TrialBannerWrapper').then((mod) => mod.TrialBannerWrapper),
  { ssr: false }
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
