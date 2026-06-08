import type { Metadata } from 'next'
import { LocalBusinessSchema } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'NEET Coaching in Hyderabad | Online Biology Classes by Cerebrum Academy',
  description:
    'Best online NEET biology coaching for Hyderabad students. AIIMS-trained faculty, live interactive classes, 98% success rate. Join Cerebrum Academy from Hyderabad!',
  openGraph: {
    title: 'NEET Coaching in Hyderabad | Online Biology Classes by Cerebrum Academy',
    description:
      'Best online NEET biology coaching for Hyderabad students. AIIMS-trained faculty, live interactive classes, 98% success rate. Join Cerebrum Academy from Hyderabad!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-hyderabad',
    type: 'website',
    locale: 'en_IN',
  },
  other: { 'article:modified_time': '2026-05-27' },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-hyderabad',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching in Hyderabad | Online Biology Classes by Cerebrum Academy',
    description: 'Best online NEET biology coaching for Hyderabad students. AIIMS-trained faculty, live interactive classes, 98% success rate. Join Cerebrum Academy from Hyderabad!',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
