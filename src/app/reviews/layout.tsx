import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Leave a Review',
  description:
    'Share your experience at Cerebrum Biology Academy. Your feedback helps future NEET aspirants make the right choice.',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/reviews',
  },

  robots: {
    index: true,
    follow: true,
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Leave a Review',
    description: 'Share your experience at Cerebrum Biology Academy. Your feedback helps future NEET aspirants make the right choice.',
  },

  openGraph: { title: 'Leave a Review', description: 'Share your experience at Cerebrum Biology Academy. Your feedback helps future NEET aspirants make the right choice.', type: 'website', locale: 'en_IN' },
}

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
