import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You | Cerebrum Biology Academy',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/thank-you',
  },

  robots: { index: false, follow: false },

  twitter: { card: 'summary_large_image' as const },

  openGraph: { title: 'Thank You | Cerebrum Biology Academy', description: 'Thank You | Cerebrum Biology Academy', type: 'website' },
}

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
