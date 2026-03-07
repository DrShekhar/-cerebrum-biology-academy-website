'use client'

import { useEffect } from 'react'

export default function MicrosoftClarity() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID

  useEffect(() => {
    if (!clarityId || typeof window === 'undefined') return

    const loadClarity = () => {
      if (window.clarity) return

      window.clarity = function () {
        ;(window.clarity as any).q = (window.clarity as any).q || []
        ;(window.clarity as any).q.push(arguments)
      }

      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.clarity.ms/tag/${clarityId}`
      document.head.appendChild(script)
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadClarity, { timeout: 5000 })
    } else {
      setTimeout(loadClarity, 3000)
    }
  }, [clarityId])

  return null
}
