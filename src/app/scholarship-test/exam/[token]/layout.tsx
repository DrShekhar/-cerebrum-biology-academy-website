import type { Metadata } from 'next'

// Token-keyed exam pages must never be indexed.
export const metadata: Metadata = {
  title: 'Scholarship Test — Exam',
  robots: { index: false, follow: false },
}

export default function ScholarshipExamLayout({ children }: { children: React.ReactNode }) {
  return children
}
