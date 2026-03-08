'use client'

import { usePathname } from 'next/navigation'
import { ExitIntentPopup, useExitIntent } from '@/components/ui/ExitIntentPopup'

export function GlobalExitIntent() {
  const { showExitIntent, hideExitIntent } = useExitIntent()
  const pathname = usePathname()

  const isHomepage = pathname === '/'
  const isConversionPage =
    pathname?.includes('/thank') ||
    pathname?.includes('/success') ||
    pathname?.includes('/checkout') ||
    pathname?.includes('/enrollment') ||
    pathname?.includes('/purchase')

  if (isHomepage || isConversionPage) {
    return null
  }

  return <ExitIntentPopup isVisible={showExitIntent} onClose={hideExitIntent} variant="discount" />
}
