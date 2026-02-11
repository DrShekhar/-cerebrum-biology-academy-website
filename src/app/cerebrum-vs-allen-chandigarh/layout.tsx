import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cerebrum vs Allen Chandigarh | NEET Biology Coaching Comparison 2026',
  description:
    'Compare Cerebrum Biology Academy vs Allen Chandigarh for NEET preparation. Batch size (10-15 vs 60-100+), fees (Rs 24K-68K vs Rs 1.5-2.5 Lakhs), AIIMS faculty, 98% success rate. Sector 34A comparison.',
  keywords: [
    'cerebrum vs allen chandigarh',
    'allen chandigarh alternative',
    'allen sector 34 chandigarh review',
    'neet coaching chandigarh comparison',
    'best neet coaching chandigarh tricity',
    'allen chandigarh fees structure',
    'allen chandigarh batch size',
    'cerebrum vs allen neet biology',
    'small batch neet coaching chandigarh',
    'aiims faculty neet coaching chandigarh',
    'allen chandigarh sector 34a review',
    'neet 2026 coaching chandigarh',
  ],
  openGraph: {
    title: 'Cerebrum vs Allen Chandigarh | Which is Better for NEET Biology 2026?',
    description:
      'Honest comparison of Cerebrum Biology Academy vs Allen Chandigarh. See why students switch from crowded 60-100+ batches to personalized 10-15 student coaching with AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/cerebrum-vs-allen-chandigarh',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cerebrum vs Allen Chandigarh | NEET Biology Coaching Comparison 2026',
    description: 'Compare Cerebrum Biology Academy vs Allen Chandigarh for NEET preparation.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/cerebrum-vs-allen-chandigarh',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function CerebrumVsAllenChandigarhLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
