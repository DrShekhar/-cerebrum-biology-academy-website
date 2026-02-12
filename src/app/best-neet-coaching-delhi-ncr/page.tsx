import type { Metadata } from 'next'
import { BestNEETCoachingDelhiNCRClient } from './BestNEETCoachingDelhiNCRClient'
import { BreadcrumbSchema } from '@/components/seo'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Delhi NCR 2025 [67+ AIIMS Selections] | Cerebrum',
  description:
    'Top NEET coaching in Delhi NCR with AIIMS-trained faculty. 98% success rate, 67+ AIIMS selections. Delhi, Noida, Gurgaon centers. Book FREE demo class today!',
  keywords: [
    'best neet coaching delhi ncr',
    'neet coaching delhi',
    'neet coaching noida',
    'neet coaching gurgaon',
    'top neet institute delhi',
    'best biology coaching delhi',
    'neet preparation delhi ncr',
    'medical coaching delhi',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Delhi NCR 2025 [67+ AIIMS Selections]',
    description: 'AIIMS-trained faculty, 98% success rate. Delhi, Noida, Gurgaon. Book FREE demo!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/best-neet-coaching-delhi-ncr',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching Delhi NCR [67+ AIIMS Selections]',
    description: 'AIIMS-trained faculty, 98% success rate, Delhi-Noida-Gurgaon!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-neet-coaching-delhi-ncr',
  },
}

export default function BestNEETCoachingDelhiNCRPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <BreadcrumbSchema
          items={[{ label: 'Best NEET Coaching Delhi NCR', isCurrentPage: true }]}
        />
      </div>
      <BestNEETCoachingDelhiNCRClient />
    </>
  )
}
