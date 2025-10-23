import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Us | India's Best NEET Biology Coaching | Cerebrum Academy Story",
  description:
    'Founded in 2015, Cerebrum Biology Academy has achieved 94.2% NEET success rate with 2,847+ medical college selections. Meet our AIIMS faculty, learn our methodology & mission.',
  keywords:
    'about Cerebrum, NEET coaching institute, biology coaching history, our mission, our faculty, coaching methodology, success rate, NEET coaching Delhi',
  openGraph: {
    title: 'About Cerebrum Biology Academy | 9 Years of NEET Excellence',
    description:
      "From 2015 to today: 2,847+ selections, 94.2% success rate, 247+ in Top 1000 AIR. Meet the team behind India's best NEET Biology coaching.",
    images: ['/og-images/about-us.jpg'],
    url: 'https://cerebrumbiologyacademy.com/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Cerebrum Biology Academy | Our Journey',
    description: '9 years, 2,847+ selections, 94.2% success, AIIMS faculty, proven methodology',
    images: ['/og-images/about-us.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
