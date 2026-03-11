import { redirect } from 'next/navigation'


import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/neet-dropper-crash-course-2025' },
}

export default function NEETDropperCrashCourse2025Page() {
  redirect('/neet-crash-course')
}
