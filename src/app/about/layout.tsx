import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Cerebrum Biology Academy | India's Most Trusted NEET Coaching",
  description:
    'About Cerebrum Biology Academy, founded by Dr. Shekhar C Singh (AIIMS Delhi) in 2014. 98% NEET success rate, 67+ AIIMS selections. Visit us today!',
  keywords:
    'Cerebrum Biology Academy, AIIMS faculty NEET coaching, Dr Shekhar Singh AIIMS, NEET Biology coaching Delhi, medical college entrance coaching, NEET success rate, top NEET coaching institute',
  openGraph: {
    title: 'About Cerebrum Biology Academy | AIIMS-Led NEET Excellence Since 2014',
    description:
      "Founded by AIIMS alumnus Dr. Shekhar C Singh. 67+ AIIMS selections, 98% success rate, AIIMS Delhi/JIPMER/AFMC placements. Meet the team behind India's #1 NEET-UG coaching.",
    images: ['/og-image.jpg'],
    url: 'https://cerebrumbiologyacademy.com/about',
    type: 'website',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Cerebrum Biology Academy | AIIMS-Led Excellence',
    description:
      'Founded 2014. AIIMS alumnus-led. 67+ AIIMS selections. 98% success rate. 4 centers in Delhi NCR.',
    images: ['/og-image.jpg'],
    creator: '@CerebrumAcademy',
    site: '@CerebrumAcademy',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/about',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
