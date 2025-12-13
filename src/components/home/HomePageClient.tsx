'use client'

import { lazy, Suspense } from 'react'
import { useExitIntent } from '@/components/ui/ExitIntentPopup'

// Lazy-load ExitIntentPopup to defer framer-motion bundle (~50KB)
const ExitIntentPopup = lazy(() =>
  import('@/components/ui/ExitIntentPopup').then((mod) => ({
    default: mod.ExitIntentPopup,
  }))
)

export function HomePageClient() {
  const { showExitIntent, hideExitIntent } = useExitIntent()

  const handleDownload = async (email: string, phone: string) => {
    try {
      const response = await fetch('/api/leads/catalog-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          phone,
          source: 'exit_intent_popup',
          page: 'homepage',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit lead')
      }

      return response.json()
    } catch (error) {
      console.error('Error submitting lead:', error)
      throw error
    }
  }

  // Only render the popup when needed (defers framer-motion load)
  if (!showExitIntent) return null

  return (
    <Suspense fallback={null}>
      <ExitIntentPopup
        isVisible={showExitIntent}
        onClose={hideExitIntent}
        onDownload={handleDownload}
      />
    </Suspense>
  )
}
