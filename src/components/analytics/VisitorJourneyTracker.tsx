'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { recordPageView } from '@/lib/analytics/visitorJourney'

/**
 * Records every page view into the session visitor-journey (sessionStorage),
 * so a WhatsApp-click / lead carries the pages the visitor moved through.
 * Renders nothing; mount once near the root layout.
 */
export function VisitorJourneyTracker() {
  const pathname = usePathname()
  useEffect(() => {
    if (pathname) recordPageView(pathname)
  }, [pathname])
  return null
}
