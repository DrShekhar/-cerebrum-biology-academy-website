import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cerebrum vs Aakash Chandigarh | NEET Biology Coaching Comparison 2026',
  description:
    'Compare Cerebrum Biology Academy vs Aakash Institute Chandigarh for NEET preparation. Batch size (10-15 vs 100+), fees (Rs 24K-68K vs Rs 1-3.5 Lakhs), AIIMS faculty, 98% success rate. All 7 Aakash centers compared.',
  keywords: [
    'cerebrum vs aakash chandigarh',
    'aakash chandigarh alternative',
    'aakash institute chandigarh review',
    'neet coaching chandigarh comparison',
    'best neet coaching chandigarh tricity',
    'aakash chandigarh fees structure',
    'aakash chandigarh batch size',
    'cerebrum vs aakash neet biology',
    'aakash anthe scholarship chandigarh',
    'aiims faculty neet coaching chandigarh',
    'aakash institute tricity review',
    'neet 2026 coaching chandigarh',
  ],
  openGraph: {
    title: 'Cerebrum vs Aakash Chandigarh | Which is Better for NEET Biology 2026?',
    description:
      'Honest comparison of Cerebrum Biology Academy vs Aakash Institute Chandigarh (7 centers). See why students switch from 100+ batches to personalized 10-15 student coaching with AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/cerebrum-vs-aakash-chandigarh',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cerebrum vs Aakash Chandigarh | NEET Biology Coaching Comparison 2026',
    description: 'Compare Cerebrum Biology Academy vs Aakash Institute Chandigarh for NEET preparation.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/cerebrum-vs-aakash-chandigarh',
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

export default function CerebrumVsAakashChandigarhLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
