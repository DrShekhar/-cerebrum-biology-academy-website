import { Metadata } from 'next'
import PageContent from './PageContent'
import { CitySchema } from '@/components/seo/CitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Online classes with 98% success rate',
  locality: 'Vadodara',
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Vadodara | 98% Success Rate',
  description:
    'Top NEET Biology coaching in Vadodara, Gujarat. AIIMS trained faculty, 98% success rate, live interactive classes. Alkapuri, Sayajigunj, Fatehgunj. Rs 24,000-48,000/year. Book free demo!',
  keywords: [
    'NEET coaching Vadodara',
    'online NEET classes Vadodara',
    'biology tuition Vadodara',
    'NEET preparation Gujarat',
    'best biology coaching Alkapuri',
    'NEET tutor Sayajigunj',
    'medical entrance coaching Vadodara',
    'NEET online classes Gujarat',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Vadodara',
    description:
      'Premium NEET coaching in Vadodara. AIIMS trained faculty, 98% success rate, 2000+ Gujarat students. Book free demo!',
    url: `${BASE_URL}/neet-coaching-vadodara`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Vadodara - Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Vadodara | 98% Success Rate',
    description:
      'NEET coaching in Vadodara for Gujarat students. AIIMS faculty, 98% success rate. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-vadodara`,
  },
}

export default function NeetCoachingVadodaraPage() {
  return <PageContent />
}
