import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Cerebrum Biology Academy | India's Most Trusted NEET Coaching",
  description:
    'Founded by Dr. Shekhar C Singh (AIIMS Delhi) in 2015. 98% NEET qualification success rate, 2,847+ medical college selections achieved. AIIMS alumnus-led teaching excellence with proven methodologies.',
  keywords:
    'Cerebrum Biology Academy, AIIMS faculty NEET coaching, Dr Shekhar Singh AIIMS, NEET Biology coaching Delhi, medical college entrance coaching, NEET success rate, top NEET coaching institute',
  openGraph: {
    title: 'About Cerebrum Biology Academy | AIIMS-Led NEET Excellence Since 2015',
    description:
      "Founded by AIIMS alumnus Dr. Shekhar C Singh. 2,847+ medical college selections, 98% success rate, 247+ Top 1000 AIR ranks. Meet the team behind India's most trusted NEET Biology coaching.",
    images: ['/og-images/about-us.jpg'],
    url: 'https://cerebrumbiologyacademy.com/about',
    type: 'website',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Cerebrum Biology Academy | AIIMS-Led Excellence',
    description:
      'Founded 2015. AIIMS alumnus-led. 2,847+ selections. 98% success rate. 247+ Top 1000 ranks.',
    images: ['/og-images/about-us.jpg'],
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
