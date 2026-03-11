import { redirect } from 'next/navigation'


import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/practice' },
}

/**
 * Redirect /practice to /neet-biology-mcq
 *
 * The /practice route is referenced in several components but doesn't exist.
 * This redirects users to the actual practice tests page.
 */
export default function PracticeRedirect() {
  redirect('/neet-biology-mcq')
}
