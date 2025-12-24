import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('hauz-khas')!

export const metadata: Metadata = {
  title: 'NEET Coaching in Hauz Khas | Biology Classes Near IIT Delhi',
  description:
    'Top NEET coaching in Hauz Khas, South Delhi. Expert biology classes near IIT Delhi, SDA & JNU. Proven results for NEET-UG aspirants. Call 88264-44334 for enrollment.',
  keywords: [
    'neet coaching in hauz khas',
    'neet biology classes hauz khas',
    'neet coaching near iit delhi',
    'best neet preparation hauz khas',
    'neet classes sda complex',
    'medical entrance coaching hauz khas',
    'neet biology tutor near jnu',
    'neet coaching green park',
  ],
  openGraph: {
    title: 'NEET Coaching in Hauz Khas | Biology Classes Near IIT Delhi',
    description:
      'Top NEET coaching in Hauz Khas, South Delhi. Expert biology classes near IIT Delhi, SDA & JNU. Proven results for NEET-UG aspirants.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-hauz-khas',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-hauz-khas',
  },
}

export default function NEETCoachingHauzKhasPage() {
  return <CityHubPage data={cityData} />
}
