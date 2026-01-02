import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You | Cerebrum Biology Academy',
  description:
    'Thank you for your interest in Cerebrum Biology Academy. Our team will contact you shortly to help you on your NEET journey.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Thank You | Cerebrum Biology Academy',
    description:
      'Thank you for your interest in Cerebrum Biology Academy. Our team will contact you shortly.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/thank-you',
    siteName: 'Cerebrum Biology Academy',
  },
}

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
