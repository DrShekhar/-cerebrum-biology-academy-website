'use client'

import { ExitIntentPopup, useExitIntent } from '@/components/ui/ExitIntentPopup'

export function GlobalExitIntent() {
  const { showExitIntent, hideExitIntent } = useExitIntent()

  const handleDownload = async (email: string, phone: string) => {
    try {
      // Submit lead to API
      const response = await fetch('/api/leads/exit-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          phone,
          source: 'exit_intent_popup',
          variant: 'discount',
          page: typeof window !== 'undefined' ? window.location.pathname : '/',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit lead')
      }

      // Track conversion event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exit_intent_conversion', {
          event_category: 'Lead Generation',
          event_label: 'Exit Intent Popup',
          value: 1,
        })
      }
    } catch (error) {
      console.error('Exit intent submission error:', error)
      throw error
    }
  }

  return (
    <ExitIntentPopup
      isVisible={showExitIntent}
      onClose={hideExitIntent}
      onDownload={handleDownload}
      variant="discount"
    />
  )
}
