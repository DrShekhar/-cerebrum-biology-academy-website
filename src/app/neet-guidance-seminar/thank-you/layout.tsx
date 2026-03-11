import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You - Seminar Registration',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-guidance-seminar/thank-you',
  },

  robots: { index: false, follow: true },
}

export default function SeminarThankYouLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
