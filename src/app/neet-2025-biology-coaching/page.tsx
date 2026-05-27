import { redirect } from 'next/navigation'


import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/neet-2025-biology-coaching' },

  twitter: { card: 'summary_large_image' as const },
}

export default function Neet2025BiologyCoachingPage() {
  redirect('/neet-2026-preparation')
}
