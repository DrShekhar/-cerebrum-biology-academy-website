import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You - Seminar Registration',
  robots: { index: false, follow: true },
}

export default function SeminarThankYouLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
