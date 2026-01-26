'use client'

import { usePathname } from 'next/navigation'
import { ReactNode, useState, useEffect } from 'react'

// Routes where header/footer should be hidden
// These pages have their own self-contained layouts
const HIDDEN_ROUTES = [
  '/sign-in',
  '/sign-up',
  '/sso-callback',
  '/study-with-me/obs',
  '/study-with-me',
]

interface ConditionalHeaderFooterProps {
  children: ReactNode
}

/**
 * Conditionally renders children (header/footer) based on current route.
 * Uses client-side pathname detection for reliability.
 * Hidden on auth routes and study-with-me page (which has its own layout).
 *
 * Uses mounted state to prevent hydration mismatch:
 * - Server and initial client render: show children (consistent)
 * - After hydration: apply route-based hiding
 */
export function ConditionalHeaderFooter({ children }: ConditionalHeaderFooterProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    console.log('[ConditionalHeaderFooter] Mounted, pathname:', pathname)
  }, [pathname])

  // Check if current route should hide header/footer
  const shouldHide = pathname ? HIDDEN_ROUTES.some((route) => pathname.startsWith(route)) : false

  // Debug logging
  if (typeof window !== 'undefined') {
    console.log(
      '[ConditionalHeaderFooter] pathname:',
      pathname,
      'shouldHide:',
      shouldHide,
      'mounted:',
      mounted
    )
  }

  // During SSR and initial render, show children but hidden via CSS if on hidden route
  // This prevents hydration mismatch while still hiding content quickly
  if (!mounted) {
    // Use inline style to hide during initial render on hidden routes
    // This avoids the flash while preventing hydration mismatch
    if (shouldHide) {
      return <div style={{ display: 'none' }}>{children}</div>
    }
    return <>{children}</>
  }

  // After mount, cleanly remove from DOM
  if (shouldHide) {
    return null
  }

  return <>{children}</>
}
