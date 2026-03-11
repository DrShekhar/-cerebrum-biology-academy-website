import { redirect } from 'next/navigation'


import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/neet-syllabus-2025' },
}

export default function NeetSyllabus2025Page() {
  redirect('/neet-syllabus-2026')
}
