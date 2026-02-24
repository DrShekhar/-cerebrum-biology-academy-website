import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You',
  description:
    'Thank you for your interest in Cerebrum Biology Academy. Our team will contact you shortly to help you on your NEET journey.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Thank You',
    description:
      'Thank you for your interest in Cerebrum Biology Academy. Our team will contact you shortly.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/thank-you',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thank You',
    description: 'Thank you for your interest in Cerebrum Biology Academy.',
  },
}

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
