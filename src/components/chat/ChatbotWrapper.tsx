'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Note: Removed ssr: false - the shouldLoad pattern already prevents SSR rendering
const IntelligentChatbot = dynamic(
  () => import('@/components/chat/IntelligentChatbot').then((mod) => mod.IntelligentChatbot),
  { loading: () => null }
)

export function ChatbotWrapper() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const loadChatbot = () => setShouldLoad(true)

    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(loadChatbot, { timeout: 5000 })
      return () => cancelIdleCallback(idleId)
    } else {
      const timerId = setTimeout(loadChatbot, 3000)
      return () => clearTimeout(timerId)
    }
  }, [])

  if (!shouldLoad) return null

  return <IntelligentChatbot />
}
