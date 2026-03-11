import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You | Cerebrum Biology Academy',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/thank-you',
  },

  robots: { index: false, follow: false },
}

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
