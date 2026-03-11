import { redirect } from 'next/navigation'


import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/neet-2025-biology-coaching' },
}

export default function Neet2025BiologyCoachingPage() {
  redirect('/neet-2026-preparation')
}
