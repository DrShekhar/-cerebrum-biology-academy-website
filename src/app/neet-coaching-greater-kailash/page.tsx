import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Greater Kailash'
const cityData = getCityData('greater-kailash')!

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Greater Kailash | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Greater Kailash Delhi. Expert biology faculty for NEET-UG. GK-1, GK-2 & nearby areas. 98% success rate, 695/720 top score. Book free demo!',
  keywords: [
    'NEET coaching Greater Kailash',
    'biology coaching GK Delhi',
    'NEET classes Greater Kailash',
    'NEET preparation GK',
    'NEET coaching GK-1',
    'NEET coaching GK-2',
    'medical entrance GK Delhi',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Greater Kailash | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Greater Kailash Delhi. Expert faculty, 98% success rate. GK-1, GK-2. Book free demo!',
    url: `${BASE_URL}/neet-coaching-greater-kailash`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: `NEET Coaching in ${locality} - Cerebrum Biology Academy`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Greater Kailash | 98% Success Rate',
    description: 'Join #1 NEET coaching in Greater Kailash Delhi. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-greater-kailash`,
  },
}

export default function NEETCoachingGreaterKailashPage() {
  return <CityHubPage data={cityData} />
}
