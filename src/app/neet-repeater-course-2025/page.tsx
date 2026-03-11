import { redirect } from 'next/navigation'


import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/neet-repeater-course-2025' },
}

export default function NeetRepeaterCourse2025Page() {
  redirect('/neet-repeaters-2026')
}
