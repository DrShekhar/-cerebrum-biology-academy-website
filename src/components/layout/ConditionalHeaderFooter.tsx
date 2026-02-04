'use client'

import { usePathname } from 'next/navigation'
import { ReactNode, useState, useEffect, createContext, useContext, useMemo } from 'react'

// Routes where header/footer should be hidden
// These pages have their own self-contained layouts
const HIDDEN_ROUTES = [
  '/sign-in',
  '/sign-up',
  '/sso-callback',
  '/study-with-me/obs',
  '/study-with-me',
]

// Context to share hide state across all ConditionalHeaderFooter instances
const HideContext = createContext<{ shouldHide: boolean; mounted: boolean }>({
  shouldHide: false,
  mounted: false,
})

interface ConditionalHeaderFooterProviderProps {
  children: ReactNode
}

/**
 * Provider that manages the hide state once for all ConditionalHeaderFooter children.
 * This prevents multiple pathname subscriptions and mounted state updates.
 */
export function ConditionalHeaderFooterProvider({ children }: ConditionalHeaderFooterProviderProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const value = useMemo(() => {
    const shouldHide = pathname ? HIDDEN_ROUTES.some((route) => pathname.startsWith(route)) : false
    return { shouldHide, mounted }
  }, [pathname, mounted])

  return <HideContext.Provider value={value}>{children}</HideContext.Provider>
}

interface ConditionalHeaderFooterProps {
  children: ReactNode
}

/**
 * Conditionally renders children (header/footer) based on current route.
 * Uses shared context to avoid multiple pathname subscriptions.
 * Hidden on auth routes and study-with-me page (which has its own layout).
 */
export function ConditionalHeaderFooter({ children }: ConditionalHeaderFooterProps) {
  const { shouldHide, mounted } = useContext(HideContext)

  // During SSR and initial render, show children but hidden via CSS if on hidden route
  if (!mounted) {
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
