'use client'

import { usePathname } from 'next/navigation'
import { ExitIntentPopup, useExitIntent } from '@/components/ui/ExitIntentPopup'

export function GlobalExitIntent() {
  const { showExitIntent, hideExitIntent } = useExitIntent()
  const pathname = usePathname()

  // Disable exit intent on homepage
  const isHomepage = pathname === '/'

  const handleDownload = async (
    email: string,
    phone: string
  ): Promise<{ discountCode?: string }> => {
    try {
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

      const data = await response.json()

      // Track conversion event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exit_intent_conversion', {
          event_category: 'Lead Generation',
          event_label: 'Exit Intent Popup',
          value: 1,
        })
      }

      return { discountCode: data.discountCode }
    } catch (error) {
      console.error('Exit intent submission error:', error)
      throw error
    }
  }

  // Don't render on homepage
  if (isHomepage) {
    return null
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
