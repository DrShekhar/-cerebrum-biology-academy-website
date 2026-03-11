import { redirect } from 'next/navigation'


import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/neet-exam-pattern-2025' },
}

export default function NeetExamPattern2025Page() {
  redirect('/neet-exam-details')
}
