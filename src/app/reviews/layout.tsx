import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Leave a Review',
  description:
    'Share your experience at Cerebrum Biology Academy. Your feedback helps future NEET aspirants make the right choice.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
