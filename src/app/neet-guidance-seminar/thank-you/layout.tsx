import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You - Seminar Registration',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-guidance-seminar/thank-you',
  },

  robots: { index: false, follow: true },

  twitter: { card: 'summary_large_image' as const },

  openGraph: {
    title: 'Thank You - Seminar Registration',
    description: 'Thank You - Seminar Registration',
    type: 'website',
  },
}

export default function SeminarThankYouLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
