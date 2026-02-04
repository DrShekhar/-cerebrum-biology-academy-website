'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

/**
 * RouteChangeIndicator - Shows a loading bar during page navigation
 *
 * This component helps prevent Flash of Unstyled Content (FOUC) by:
 * 1. Showing a visual indicator that a page transition is in progress
 * 2. Giving the CSS time to load before the new page renders
 *
 * Performance optimizations:
 * - Uses refs to avoid re-attaching event listeners on every route change
 * - Uses bubble phase instead of capture phase for better performance
 * - Uses CSS animations (GPU-accelerated) for smooth transitions
 */
export function RouteChangeIndicator() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)
  const [progress, setProgress] = useState(0)

  // Use ref to track current pathname without causing effect re-runs
  const pathnameRef = useRef(pathname)
  pathnameRef.current = pathname

  // Track navigation start - stable callback
  const handleNavigationStart = useCallback(() => {
    setIsNavigating(true)
    setProgress(0)

    // Animate progress bar
    const timer1 = setTimeout(() => setProgress(30), 50)
    const timer2 = setTimeout(() => setProgress(60), 200)
    const timer3 = setTimeout(() => setProgress(80), 500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  // Track navigation complete
  useEffect(() => {
    // When pathname changes, navigation is complete
    setProgress(100)
    const timer = setTimeout(() => {
      setIsNavigating(false)
      setProgress(0)
    }, 200)

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  // Listen for link clicks to detect navigation start
  // Uses ref for pathname to avoid re-attaching listener on every route change
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')

      if (link) {
        const href = link.getAttribute('href')
        // Only trigger for internal navigation links (not external or anchor links)
        if (href && href.startsWith('/') && !href.startsWith('/#') && href !== pathnameRef.current) {
          handleNavigationStart()
        }
      }
    }

    // Use bubble phase (false) instead of capture phase for better performance
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [handleNavigationStart]) // Only re-attach if handleNavigationStart changes (it won't due to empty deps)

  if (!isNavigating && progress === 0) {
    return null
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent pointer-events-none"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page loading"
    >
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-200 ease-out shadow-lg shadow-blue-500/50"
        style={{
          width: `${progress}%`,
          opacity: isNavigating || progress > 0 ? 1 : 0,
        }}
      />
    </div>
  )
}
