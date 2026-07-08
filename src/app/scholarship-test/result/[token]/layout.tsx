import type { Metadata } from 'next'

// Token-keyed scorecards are private to the link holder — never indexed.
export const metadata: Metadata = {
  title: 'Scholarship Test — Scorecard',
  robots: { index: false, follow: false },
}

export default function ScholarshipResultLayout({ children }: { children: React.ReactNode }) {
  return children
}
