'use client'

import { ExitIntentPopup, useExitIntent } from '@/components/ui/ExitIntentPopup'

interface BlogExitIntentWrapperProps {
  articleSlug: string
}

export function BlogExitIntentWrapper({ articleSlug }: BlogExitIntentWrapperProps) {
  const { showExitIntent, hideExitIntent } = useExitIntent()

  const handleLeadCapture = async (email: string, phone: string) => {
    try {
      const response = await fetch('/api/blog/capture-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          phone,
          source: 'blog_exit_intent',
          articleSlug,
        }),
      })

      const data = await response.json()

      if (data.success) {
        return { discountCode: 'NEET20' }
      }
      return {}
    } catch {
      return {}
    }
  }

  return (
    <ExitIntentPopup
      isVisible={showExitIntent}
      onClose={hideExitIntent}
      onDownload={handleLeadCapture}
      variant="discount"
    />
  )
}
