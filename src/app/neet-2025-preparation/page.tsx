import { redirect } from 'next/navigation'


import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/neet-2025-preparation' },
}

export default function NEET2025PreparationPage() {
  redirect('/neet-2026-preparation')
}
