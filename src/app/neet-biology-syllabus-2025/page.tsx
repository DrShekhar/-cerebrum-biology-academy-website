import { redirect } from 'next/navigation'


import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/neet-biology-syllabus-2025' },

  twitter: { card: 'summary_large_image' as const },
}

export default function NeetBiologySyllabus2025Page() {
  redirect('/neet-biology-syllabus-2026')
}
