import { redirect } from 'next/navigation'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/support/help-center' },

  twitter: { card: 'summary_large_image' as const },
}

/**
 * Redirect /support/help-center to /help
 *
 * Navigation config references /support/help-center but the help page exists at /help.
 * This redirect ensures users reach the correct page.
 */
export default function HelpCenterRedirect() {
  redirect('/help')
}
