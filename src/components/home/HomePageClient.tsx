'use client'

import { ExitIntentPopup, useExitIntent } from '@/components/ui/ExitIntentPopup'

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

  return (
    <ExitIntentPopup
      isVisible={showExitIntent}
      onClose={hideExitIntent}
      onDownload={handleDownload}
    />
  )
}
