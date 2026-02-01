'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import dynamic from 'next/dynamic'

// Note: Removed ssr: false - the shouldLoad pattern already prevents SSR rendering
const IntelligentChatbot = dynamic(
  () => import('@/components/chat/IntelligentChatbot').then((mod) => mod.IntelligentChatbot),
  { loading: () => null }
)

export function ChatbotWrapper() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  // Ceri AI should ONLY show on authenticated pages (dashboard, tests, etc.)
  // Should NOT show on public pages (homepage, landing pages, pricing)
  const shouldShowCeri =
    isAuthenticated &&
    (pathname.startsWith('/dashboard') ||
      pathname.startsWith('/tests') ||
      pathname.startsWith('/ai-education-demo') ||
      pathname.startsWith('/profile') ||
      pathname.startsWith('/courses/enrolled'))

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!shouldShowCeri) return // Don't load if shouldn't show

    const loadChatbot = () => setShouldLoad(true)

    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(loadChatbot, { timeout: 5000 })
      return () => cancelIdleCallback(idleId)
    } else {
      const timerId = setTimeout(loadChatbot, 3000)
      return () => clearTimeout(timerId)
    }
  }, [shouldShowCeri])

  if (!shouldLoad || !shouldShowCeri) return null

  return <IntelligentChatbot />
}
